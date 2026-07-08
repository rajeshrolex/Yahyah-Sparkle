<?php
// Public Products API with Search, Filter & Pagination - Yahyah-Sparkle
require_once __DIR__ . '/../bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 9;
$offset = ($page - 1) * $limit;

$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : 0;

$whereClauses = ['p.is_active = 1'];
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

$whereSQL = 'WHERE ' . implode(' AND ', $whereClauses);

// Count total items
$countQuery = "SELECT COUNT(*) as total FROM products p $whereSQL";
$stmt = $pdo->prepare($countQuery);
$stmt->execute($params);
$totalItems = intval($stmt->fetch()['total'] ?? 0);
$totalPages = ceil($totalItems / $limit);

// Fetch products with category details
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

// Format response
jsonResponse([
    'products' => $products,
    'pagination' => [
        'total_items' => $totalItems,
        'total_pages' => $totalPages,
        'current_page' => $page,
        'limit' => $limit
    ]
]);
