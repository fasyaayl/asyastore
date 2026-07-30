<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once __DIR__ . '/../config.php';

try {
    $category = $_GET['category'] ?? 'all';
    $search   = $_GET['search'] ?? '';

    $sql = "SELECT * FROM products WHERE 1=1";
    $params = [];

    if ($category !== 'all' && !empty($category)) {
        $sql .= " AND category_slug = :category";
        $params['category'] = $category;
    }

    if (!empty($search)) {
        $sql .= " AND (name LIKE :search OR description LIKE :search)";
        $params['search'] = '%' . $search . '%';
    }

    $sql .= " ORDER BY id ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll();

    echo json_encode([
        'status'  => 'success',
        'count'   => count($products),
        'data'    => $products
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
