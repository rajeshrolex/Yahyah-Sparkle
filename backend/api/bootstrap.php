<?php
// Bootstrap file for APIs - Yahyah-Sparkle

// Allow from any origin (Update in production to specific domain if necessary)
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

header('Content-Type: application/json; charset=utf-8');

// Error reporting settings
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config/database.php';

// Detect local host to bypass real DB connection
$isLocal = isset($_SERVER['HTTP_HOST']) && (
    strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || 
    strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false ||
    strpos($_SERVER['HTTP_HOST'], '[::1]') !== false
);

if ($isLocal) {
    // Direct mock database loader for local developer preview
    require_once __DIR__ . '/mock_pdo.php';
    $pdo = new MockPDO(__DIR__ . '/../database/mock_db.json');
} else {
    // Real MySQL connection for production environment
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit();
    }
}

// Helper to send json response
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

// Parse request body if it is JSON
$requestBody = file_get_contents('php://input');
$jsonData = json_decode($requestBody, true);
if (is_array($jsonData)) {
    $_POST = array_merge($_POST, $jsonData);
}

// JWT Helpers
class JWT {
    private static $key = JWT_SECRET;

    public static function encode($payload) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode($payload);
        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode($payload);
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$key, true);
        $base64UrlSignature = self::base64UrlEncode($signature);
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function decode($jwt) {
        $part = explode('.', $jwt);
        if (count($part) !== 3) return null;
        $header = json_decode(self::base64UrlDecode($part[0]), true);
        $payload = json_decode(self::base64UrlDecode($part[1]), true);
        $signature = self::base64UrlDecode($part[2]);
        $validSign = hash_hmac('sha256', $part[0] . "." . $part[1], self::$key, true);
        if (hash_equals($signature, $validSign)) {
            if (isset($payload['exp']) && $payload['exp'] < time()) {
                return null;
            }
            return $payload;
        }
        return null;
    }

    private static function base64UrlEncode($data) {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
    }

    private static function base64UrlDecode($data) {
        $urlDecoded = str_replace(['-', '_'], ['+', '/'], $data);
        $len = strlen($urlDecoded) % 4;
        if ($len > 0) {
            $urlDecoded .= str_repeat('=', 4 - $len);
        }
        return base64_decode($urlDecoded);
    }
}

// Get bearer token from header
function getBearerToken() {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    // Check $_SERVER alternative if getallheaders is missing/empty
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        if (preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}

// Check admin auth
function requireAdmin() {
    $token = getBearerToken();
    if (!$token) {
        jsonResponse(['error' => 'Access token required'], 401);
    }
    $decoded = JWT::decode($token);
    if (!$decoded || !isset($decoded['role']) || $decoded['role'] !== 'admin') {
        jsonResponse(['error' => 'Unauthorized admin access'], 403);
    }
    return $decoded;
}
