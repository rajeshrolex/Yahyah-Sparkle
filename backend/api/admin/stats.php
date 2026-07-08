<?php
// Admin Stats API - Yahyah-Sparkle
require_once __DIR__ . '/../bootstrap.php';

// Secure Admin-Only access
requireAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

// Get stats counts
$productCount = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
$activeProducts = $pdo->query("SELECT COUNT(*) FROM products WHERE is_active = 1")->fetchColumn();
$inactiveProducts = $productCount - $activeProducts;

$categoryCount = $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn();
$userCount = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();

// Get products per category distribution
$categoryDistribution = $pdo->query("
    SELECT c.name as category_name, COUNT(p.id) as product_count 
    FROM categories c 
    LEFT JOIN products p ON c.id = p.category_id 
    GROUP BY c.id
")->fetchAll();

// Mock some analytics for charts
$analytics = [
    'products_by_category' => $categoryDistribution,
    'counts' => [
        'total_products' => intval($productCount),
        'active_products' => intval($activeProducts),
        'inactive_products' => intval($inactiveProducts),
        'total_categories' => intval($categoryCount),
        'total_users' => intval($userCount)
    ]
];

jsonResponse($analytics);
