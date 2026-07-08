<?php
// Admin Category Management API - Yahyah-Sparkle
require_once __DIR__ . '/../bootstrap.php';

// Secure Admin-Only access
requireAdmin();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->prepare("
        SELECT c.*, COUNT(p.id) as product_count 
        FROM categories c 
        LEFT JOIN products p ON c.id = p.category_id 
        GROUP BY c.id 
        ORDER BY c.name ASC
    ");
    $stmt->execute();
    $categories = $stmt->fetchAll();
    jsonResponse($categories);
}

if ($method === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $description = trim($_POST['description'] ?? '');

    if (empty($name)) {
        jsonResponse(['error' => 'Category name is required'], 400);
    }

    // Check if name already exists
    $stmt = $pdo->prepare("SELECT id FROM categories WHERE name = ?");
    $stmt->execute([$name]);
    if ($stmt->fetch()) {
        jsonResponse(['error' => 'Category name already exists'], 400);
    }

    $stmt = $pdo->prepare("INSERT INTO categories (name, description) VALUES (?, ?)");
    $stmt->execute([$name, $description]);
    $newId = $pdo->lastInsertId();

    jsonResponse([
        'message' => 'Category created successfully',
        'category' => [
            'id' => $newId,
            'name' => $name,
            'description' => $description
        ]
    ], 21);
}

if ($method === 'PUT') {
    $id = intval($_POST['id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    $description = trim($_POST['description'] ?? '');

    if ($id <= 0 || empty($name)) {
        jsonResponse(['error' => 'Valid Category ID and name are required'], 400);
    }

    // Check uniqueness excluding current ID
    $stmt = $pdo->prepare("SELECT id FROM categories WHERE name = ? AND id != ?");
    $stmt->execute([$name, $id]);
    if ($stmt->fetch()) {
        jsonResponse(['error' => 'Category name already exists'], 400);
    }

    $stmt = $pdo->prepare("UPDATE categories SET name = ?, description = ? WHERE id = ?");
    $stmt->execute([$name, $description, $id]);

    jsonResponse(['message' => 'Category updated successfully']);
}

if ($method === 'DELETE') {
    // Since DELETE requests might send values in URL parameters or input
    $id = intval($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(['error' => 'Valid Category ID is required'], 400);
    }

    $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(['message' => 'Category deleted successfully']);
}
