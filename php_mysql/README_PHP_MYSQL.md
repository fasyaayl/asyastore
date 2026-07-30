# Panduan Penggunaan Code PHP & MySQL untuk Toko Online

Folder `/php_mysql` ini berisi kode backend lengkap berstruktur **PHP** dan database **MySQL** yang siap Anda gunakan untuk VS Code, Localhost (XAMPP/LAMP), maupun Hosting (cPanel).

---

## 📁 Struktur File PHP & MySQL

```text
php_mysql/
├── database.sql       # Script SQL untuk membuat database & 12 produk
├── config.php         # Konfigurasi koneksi MySQL (PDO)
├── index.php          # Halaman toko online PHP dinamis
├── README_PHP_MYSQL.md# Panduan ini
└── api/
    ├── products.php   # REST API GET produk (semua/kategori/search)
    └── checkout.php   # REST API POST pesanan ke database MySQL
```

---

## 🛠️ Langkah Cepat Menjalankan di XAMPP / Localhost (VS Code)

### 1. Download & Buat Database
1. Buka **XAMPP Control Panel**, lalu jalankan **Apache** dan **MySQL**.
2. Buka browser dan akses **`http://localhost/phpmyadmin`**.
3. Buat database baru bernama **`tokoonline_db`**.
4. Klik tab **Import**, pilih file `php_mysql/database.sql`, lalu klik **Go** / **Kirim**.
   *(Semua tabel `categories`, `products`, `orders`, `order_items` beserta 12 produk akan otomatis terbuat)*.

### 2. Salin File ke `htdocs`
1. Copy seluruh isi folder `php_mysql/` ke folder XAMPP Anda:
   - Windows: `C:\xampp\htdocs\tokoonline\`
   - macOS: `/Applications/XAMPP/htdocs/tokoonline/`
2. Buka folder `tokoonline` di **VS Code**.

### 3. Cek Konfigurasi `config.php`
Buka `config.php` dan pastikan pengaturan sesuai dengan MySQL lokal Anda (default XAMPP):
```php
$host     = '127.0.0.1';
$dbname   = 'tokoonline_db';
$username = 'root';
$password = ''; // Kosong untuk XAMPP
```

### 4. Akses Aplikasi di Browser
Buka browser dan jalankan:
- **Halaman Utama (PHP Web):** `http://localhost/tokoonline/`
- **API Produk (JSON):** `http://localhost/tokoonline/api/products.php`
- **API Filter Kategori:** `http://localhost/tokoonline/api/products.php?category=Shoes`

---

## ☁️ Cara Hosting ke cPanel / Live Server

1. **Upload File:** Compress seluruh file PHP Anda menjadi `.zip` lalu upload dan extract di folder `public_html` pada cPanel Hosting.
2. **Buat Database di cPanel:**
   - Masuk ke menu **MySQL Databases** di cPanel.
   - Buat nama database & user baru, lalu hubungkan (Grant All Privileges).
3. **Import SQL via phpMyAdmin:**
   - Masuk ke **phpMyAdmin** di cPanel, pilih database baru Anda, lalu import `database.sql`.
4. **Update `config.php`:**
   - Sesuaikan `$dbname`, `$username`, dan `$password` dengan data database cPanel Anda.

---

## 🚀 Menghubungkan React Frontend ke Backend PHP & MySQL

Jika Anda ingin tetap menggunakan React untuk tampilan dan PHP/MySQL untuk database, ubah URL fetch data di React dari mock data ke API PHP:

```javascript
// Di React component
fetch('http://localhost/tokoonline/api/products.php')
  .then(res => res.json())
  .then(data => setProducts(data.data));
```
