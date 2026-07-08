<?php
// Admin Products Management API - Yahyah-Sparkle
require_once __DIR__ . '/../bootstrap.php';

// Secure Admin-Only access
requireAdmin();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // If getting single product details
    $id = intval($_GET['id'] ?? 0);
    if ($id > 0) {
        $stmt = $pdo->prepare("
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.id = ?
        ");
        $stmt->execute([$id]);
        $product = $stmt->fetch();
        if (!$product) {
            jsonResponse(['error' => 'Product not found'], 404);
        }
        jsonResponse($product);
    }

    // List products
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 10;
    $offset = ($page - 1) * $limit;

    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    $category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : 0;
    $status = isset($_GET['status']) ? trim($_GET['status']) : ''; // 'active', 'inactive', or empty for all

    $whereClauses = [];
    $params = [];

    if (!empty($search)) {
        $whereClauses[] = '(p.name LIKE ? OR p.description LIKE ?)';
        $params[] = "%$search%";
        $params[] = "%$search%";
    }

    if ($category_id > 0) {
        $whereClauses[] = 'p.category_id = ?';
        $params[] = $category_id;
    }

    if ($status === 'active') {
        $whereClauses[] = 'p.is_active = 1';
    } elseif ($status === 'inactive') {
        $whereClauses[] = 'p.is_active = 0';
    }

    $whereSQL = '';
    if (count($whereClauses) > 0) {
        $whereSQL = 'WHERE ' . implode(' AND ', $whereClauses);
    }

    // Count
    $countQuery = "SELECT COUNT(*) as total FROM products p $whereSQL";
    $stmt = $pdo->prepare($countQuery);
    $stmt->execute($params);
    $totalItems = intval($stmt->fetch()['total'] ?? 0);
    $totalPages = ceil($totalItems / $limit);

    // Fetch
    $query = "
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        $whereSQL 
        ORDER BY p.id DESC 
        LIMIT $limit OFFSET $offset
    ";
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $products = $stmt->fetchAll();

    jsonResponse([
        'products' => $products,
        'pagination' => [
            'total_items' => $totalItems,
            'total_pages' => $totalPages,
            'current_page' => $page,
            'limit' => $limit
        ]
    ]);
}

if ($method === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $price = !empty($_POST['price']) ? floatval($_POST['price']) : null;
    $category_id = !empty($_POST['category_id']) ? intval($_POST['category_id']) : null;
    $is_active = isset($_POST['is_active']) ? intval($_POST['is_active']) : 1;

    if (empty($name) || empty($description)) {
        jsonResponse(['error' => 'Product name and description are required'], 400);
    }

    $uploadedImages = [];
    $uploadDir = __DIR__ . '/../../uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Handle multiple image uploads
    if (isset($_FILES['images']) && is_array($_FILES['images']['name'])) {
        $fileCount = count($_FILES['images']['name']);
        for ($i = 0; $i < $fileCount; $i++) {
            if ($_FILES['images']['error'][$i] === UPLOAD_ERR_OK) {
                $fileTmpPath = $_FILES['images']['tmp_name'][$i];
                $fileName = $_FILES['images']['name'][$i];
                $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

                $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
                if (in_array($fileExtension, $allowedExtensions)) {
                    $newFileName = 'prod_' . bin2hex(random_bytes(8)) . '_' . $i . '.' . $fileExtension;
                    $destPath = $uploadDir . $newFileName;

                    if (compressProductImage($fileTmpPath, $destPath, $fileExtension, 75)) {
                        $uploadedImages[] = 'uploads/' . $newFileName;
                    }
                }
            }
        }
    }

    $imagesJson = json_encode($uploadedImages);

    $stmt = $pdo->prepare("
        INSERT INTO products (name, description, price, category_id, images, is_active) 
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$name, $description, $price, $category_id, $imagesJson, $is_active]);
    $newId = $pdo->lastInsertId();

    jsonResponse([
        'message' => 'Product created successfully',
        'id' => $newId
    ]);
}

if ($method === 'POST' && isset($_GET['action']) && $_GET['action'] === 'update') {
    // We route PUT with multi-image/multipart data as POST with action=update due to PHP's limitations parsing multipart PUT requests
    $id = intval($_POST['id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $price = !empty($_POST['price']) ? floatval($_POST['price']) : null;
    $category_id = !empty($_POST['category_id']) ? intval($_POST['category_id']) : null;
    $is_active = isset($_POST['is_active']) ? intval($_POST['is_active']) : 1;
    $existingImages = json_decode($_POST['existing_images'] ?? '[]', true);

    if ($id <= 0 || empty($name) || empty($description)) {
        jsonResponse(['error' => 'Valid ID, Product name, and description are required'], 400);
    }

    $uploadedImages = $existingImages;
    $uploadDir = __DIR__ . '/../../uploads/';

    // Handle new uploads
    if (isset($_FILES['images']) && is_array($_FILES['images']['name'])) {
        $fileCount = count($_FILES['images']['name']);
        for ($i = 0; $i < $fileCount; $i++) {
            if ($_FILES['images']['error'][$i] === UPLOAD_ERR_OK) {
                $fileTmpPath = $_FILES['images']['tmp_name'][$i];
                $fileName = $_FILES['images']['name'][$i];
                $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

                $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
                if (in_array($fileExtension, $allowedExtensions)) {
                    $newFileName = 'prod_' . bin2hex(random_bytes(8)) . '_up_' . $i . '.' . $fileExtension;
                    $destPath = $uploadDir . $newFileName;

                    if (compressProductImage($fileTmpPath, $destPath, $fileExtension, 75)) {
                        $uploadedImages[] = 'uploads/' . $newFileName;
                    }
                }
            }
        }
    }

    $imagesJson = json_encode($uploadedImages);

    $stmt = $pdo->prepare("
        UPDATE products 
        SET name = ?, description = ?, price = ?, category_id = ?, images = ?, is_active = ? 
        WHERE id = ?
    ");
    $stmt->execute([$name, $description, $price, $category_id, $imagesJson, $is_active, $id]);

    jsonResponse(['message' => 'Product updated successfully']);
}

if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(['error' => 'Valid Product ID is required'], 400);
    }

    // Get images to delete from disk
    $stmt = $pdo->prepare("SELECT images FROM products WHERE id = ?");
    $stmt->execute([$id]);
    $prod = $stmt->fetch();

    if ($prod) {
        $images = json_decode($prod['images'] ?? '[]', true);
        $uploadDir = __DIR__ . '/../../uploads/';
        foreach ($images as $img) {
            $path = $uploadDir . basename($img);
            if (file_exists($path)) {
                @unlink($path);
            }
        }
    }

    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(['message' => 'Product deleted successfully']);
}

// Function to compress image using GD
function compressProductImage($source, $destination, $extension, $quality = 75) {
    list($width, $height) = getimagesize($source);
    $maxWidth = 800;
    $maxHeight = 800;

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
