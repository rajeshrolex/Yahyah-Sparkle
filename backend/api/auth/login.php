<?php
// Admin Login API - Yahyah-Sparkle
require_once __DIR__ . '/../bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');

if (empty($username) || empty($password)) {
    jsonResponse(['error' => 'Username and password are required'], 400);
}

// Fetch user from DB
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    jsonResponse(['error' => 'Invalid username or password'], 401);
}

// Expiry in 7 days
$issuedAt = time();
$expirationTime = $issuedAt + (7 * 24 * 60 * 60);

$payload = [
    'sub' => $user['id'],
    'username' => $user['username'],
    'role' => $user['role'],
    'iat' => $issuedAt,
    'exp' => $expirationTime
];

$token = JWT::encode($payload);

jsonResponse([
    'message' => 'Login successful',
    'token' => $token,
    'user' => [
        'id' => $user['id'],
        'username' => $user['username'],
        'role' => $user['role']
    ]
]);
