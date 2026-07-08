<?php
// Temporary script to import DB schema in production - Yahyah-Sparkle
require_once __DIR__ . '/bootstrap.php';

if ($isLocal) {
    jsonResponse(['error' => 'Not allowed locally'], 403);
}

try {
    $schemaFile = __DIR__ . '/../database/schema.sql';
    if (!file_exists($schemaFile)) {
        jsonResponse(['error' => 'schema.sql file not found'], 404);
    }

    $sql = file_get_contents($schemaFile);
    
    // Execute schema queries
    $pdo->exec($sql);

    jsonResponse(['message' => 'Database schema imported successfully! You can now log in using the seed admin credentials. Please delete this import_db.php file.']);
} catch (Exception $e) {
    jsonResponse(['error' => 'Database import failed: ' . $e->getMessage()], 500);
}
