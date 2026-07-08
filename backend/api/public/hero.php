<?php
// Public Hero Settings API - Yahyah-Sparkle
require_once __DIR__ . '/../bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$stmt = $pdo->prepare("SELECT * FROM hero WHERE is_enabled = 1 ORDER BY id DESC LIMIT 1");
$stmt->execute();
$hero = $stmt->fetch();

if (!$hero) {
    // Return empty fallback structure if none enabled/found
    $hero = [
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
