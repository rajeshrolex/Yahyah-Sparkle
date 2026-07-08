<?php
// Admin Hero Management API - Yahyah-Sparkle
require_once __DIR__ . '/../bootstrap.php';

// Secure Admin-Only access
requireAdmin();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->prepare("SELECT * FROM hero ORDER BY id DESC LIMIT 1");
    $stmt->execute();
    $hero = $stmt->fetch();
    
    if (!$hero) {
        $hero = [
            'id' => 0,
            'is_enabled' => 0,
            'heading' => '',
            'description' => '',
            'background_image' => '',
            'primary_cta_text' => '',
            'primary_cta_link' => '',
            'secondary_cta_text' => '',
            'secondary_cta_link' => ''
        ];
    }
    jsonResponse($hero);
}

if ($method === 'POST') {
    // Read parameters from $_POST (since multipart form-data uploads files and standard fields are in $_POST)
    $heading = trim($_POST['heading'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $primary_cta_text = trim($_POST['primary_cta_text'] ?? '');
    $primary_cta_link = trim($_POST['primary_cta_link'] ?? '');
    $secondary_cta_text = trim($_POST['secondary_cta_text'] ?? '');
    $secondary_cta_link = trim($_POST['secondary_cta_link'] ?? '');
    $is_enabled = intval($_POST['is_enabled'] ?? 1);

    if (empty($heading) || empty($description)) {
        jsonResponse(['error' => 'Heading and description are required'], 400);
    }

    // Get current hero to preserve/delete image
    $stmt = $pdo->prepare("SELECT * FROM hero ORDER BY id DESC LIMIT 1");
    $stmt->execute();
    $currentHero = $stmt->fetch();
    
    $backgroundImage = $currentHero['background_image'] ?? '';

    // Handle background image upload
    if (isset($_FILES['background_image']) && $_FILES['background_image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/../../uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $fileTmpPath = $_FILES['background_image']['tmp_name'];
        $fileName = $_FILES['background_image']['name'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        if (!in_array($fileExtension, $allowedExtensions)) {
            jsonResponse(['error' => 'Invalid image format. Allowed formats: JPG, JPEG, PNG, WEBP'], 400);
        }

        // Generate unique filename
        $newFileName = 'hero_' . bin2hex(random_bytes(8)) . '.' . $fileExtension;
        $destPath = $uploadDir . $newFileName;

        // Compress and save
        $compressed = compressImage($fileTmpPath, $destPath, $fileExtension, 75);
        if ($compressed) {
            // Delete old image if it exists
            if (!empty($backgroundImage) && file_exists($uploadDir . basename($backgroundImage))) {
                @unlink($uploadDir . basename($backgroundImage));
            }
            // Save absolute or relative web path
            $backgroundImage = 'uploads/' . $newFileName;
        } else {
            jsonResponse(['error' => 'Failed to compress and save image'], 500);
        }
    }

    if ($currentHero) {
        $stmt = $pdo->prepare("
            UPDATE hero 
            SET heading = ?, description = ?, primary_cta_text = ?, primary_cta_link = ?, 
                secondary_cta_text = ?, secondary_cta_link = ?, is_enabled = ?, background_image = ? 
            WHERE id = ?
        ");
        $stmt->execute([
            $heading, $description, $primary_cta_text, $primary_cta_link,
            $secondary_cta_text, $secondary_cta_link, $is_enabled, $backgroundImage,
            $currentHero['id']
        ]);
    } else {
        $stmt = $pdo->prepare("
            INSERT INTO hero (heading, description, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link, is_enabled, background_image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $heading, $description, $primary_cta_text, $primary_cta_link,
            $secondary_cta_text, $secondary_cta_link, $is_enabled, $backgroundImage
        ]);
    }

    jsonResponse(['message' => 'Hero section updated successfully']);
}

// Function to compress image using GD
function compressImage($source, $destination, $extension, $quality = 75) {
    list($width, $height) = getimagesize($source);
    
    // Max width/height to avoid memory limit issues and keep sizes web-ready
    $maxWidth = 1920;
    $maxHeight = 1080;
    
    $ratio = $width / $height;
    if ($width > $maxWidth || $height > $maxHeight) {
        if ($maxWidth / $maxHeight > $ratio) {
            $newWidth = $maxHeight * $ratio;
            $newHeight = $maxHeight;
        } else {
            $newWidth = $maxWidth;
            $newHeight = $maxWidth / $ratio;
        }
    } else {
        $newWidth = $width;
        $newHeight = $height;
    }

    switch ($extension) {
        case 'jpg':
        case 'jpeg':
            $image = imagecreatefromjpeg($source);
            break;
        case 'png':
            $image = imagecreatefrompng($source);
            break;
        case 'webp':
            $image = imagecreatefromwebp($source);
            break;
        default:
            return false;
    }

    $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
    
    // Preserve transparency for PNG and WEBP
    if ($extension == 'png' || $extension == 'webp') {
        imagealphablending($resizedImage, false);
        imagesavealpha($resizedImage, true);
    }

    imagecopyresampled($resizedImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

    switch ($extension) {
        case 'jpg':
        case 'jpeg':
            $result = imagejpeg($resizedImage, $destination, $quality);
            break;
        case 'png':
            // PNG quality parameter is 0 (no compression) to 9 (maximum compression)
            $pngQuality = round((100 - $quality) / 10);
            $result = imagepng($resizedImage, $destination, $pngQuality);
            break;
        case 'webp':
            $result = imagewebp($resizedImage, $destination, $quality);
            break;
        default:
            $result = false;
    }

    imagedestroy($image);
    imagedestroy($resizedImage);

    return $result;
}
