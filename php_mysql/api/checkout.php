<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

require_once __DIR__ . '/../config.php';

// Ambil data JSON dari request body
$inputData = json_decode(file_get_contents('php://input'), true);

if (!$inputData) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Data input tidak valid.']);
    exit;
}

try {
    $pdo->beginTransaction();

    $orderNumber     = 'ORD-' . strtoupper(uniqid());
    $customerName    = $inputData['customer_name'] ?? 'Pelanggan';
    $customerEmail   = $inputData['customer_email'] ?? 'pelanggan@example.com';
    $customerPhone   = $inputData['customer_phone'] ?? '081234567890';
    $shippingAddress = $inputData['shipping_address'] ?? 'Alamat Pengiriman';
    $totalAmount     = $inputData['total_amount'] ?? 0;
    $items           = $inputData['items'] ?? [];

    // Simpan ke tabel orders
    $stmtOrder = $pdo->prepare("INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, total_amount) VALUES (?, ?, ?, ?, ?, ?)");
    $stmtOrder->execute([$orderNumber, $customerName, $customerEmail, $customerPhone, $shippingAddress, $totalAmount]);
    $orderId = $pdo->lastInsertId();

    // Simpan item-item pesanan ke order_items
    $stmtItem = $pdo->prepare("INSERT INTO order_items (order_id, product_id, quantity, price, selected_color, selected_size) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($items as $item) {
        $stmtItem->execute([
            $orderId,
            $item['product_id'],
            $item['quantity'],
            $item['price'],
            $item['selected_color'] ?? null,
            $item['selected_size'] ?? null
        ]);
    }

    $pdo->commit();

    echo json_encode([
        'status' => 'success',
        'message' => 'Pesanan berhasil dibuat!',
        'order_number' => $orderNumber,
        'order_id' => $orderId
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Gagal memproses pesanan: ' . $e->getMessage()
    ]);
}
?>
