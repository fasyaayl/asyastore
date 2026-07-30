<?php
// ========================================================
// DATABASE CONNECTION CONFIGURATION (PHP & MYSQL)
// Ubah sesuai dengan konfigurasi server MySQL / XAMPP Anda
// ========================================================

$host     = '127.0.0.1'; // atau 'localhost'
$dbname   = 'tokoonline_db';
$username = 'root';      // Default XAMPP username
$password = '';          // Default XAMPP password (kosong)
$charset  = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (\PDOException $e) {
    // Menampilkan pesan error jika gagal koneksi
    die(json_encode([
        'status' => 'error',
        'message' => 'Koneksi database gagal: ' . $e->getMessage()
    ]));
}
?>
