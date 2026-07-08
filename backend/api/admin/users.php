<?php
// Admin Users Management API - Yahyah-Sparkle
require_once __DIR__ . '/../bootstrap.php';

// Secure Admin-Only access
$currentUser = requireAdmin();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT id, username, role, created_at FROM users ORDER BY username ASC");
    $users = $stmt->fetchAll();
    jsonResponse($users);
}

if ($method === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $role = trim($_POST['role'] ?? 'admin');

    if (empty($username) || empty($password)) {
        jsonResponse(['error' => 'Username and password are required'], 400);
    }

    if (strlen($password) < 6) {
        jsonResponse(['error' => 'Password must be at least 6 characters long'], 400);
    }

    // Check if user already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        jsonResponse(['error' => 'Username is already taken'], 400);
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $pdo->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
    $stmt->execute([$username, $hashedPassword, $role]);

    jsonResponse(['message' => 'User created successfully']);
}

if ($method === 'PUT') {
    $id = intval($_POST['id'] ?? 0);
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $role = trim($_POST['role'] ?? 'admin');

    if ($id <= 0 || empty($username)) {
        jsonResponse(['error' => 'Valid ID and username are required'], 400);
    }

    // Check uniqueness excluding current ID
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? AND id != ?");
    $stmt->execute([$username, $id]);
    if ($stmt->fetch()) {
        jsonResponse(['error' => 'Username is already taken'], 400);
    }

    if (!empty($password)) {
        if (strlen($password) < 6) {
            jsonResponse(['error' => 'Password must be at least 6 characters long'], 400);
        }
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?");
        $stmt->execute([$username, $hashedPassword, $role, $id]);
    } else {
        $stmt = $pdo->prepare("UPDATE users SET username = ?, role = ? WHERE id = ?");
        $stmt->execute([$username, $role, $id]);
    }

    jsonResponse(['message' => 'User updated successfully']);
}

if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(['error' => 'Valid User ID is required'], 400);
    }

    // Do not allow deleting current logged-in user
    if ($id === intval($currentUser['sub'])) {
        jsonResponse(['error' => 'You cannot delete your own admin account'], 400);
    }

    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(['message' => 'User deleted successfully']);
}
