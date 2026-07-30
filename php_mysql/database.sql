-- ========================================================
-- DATABASE STRUCTURE FOR TOKO ONLINE (PHP & MYSQL)
-- Import file ini di phpMyAdmin / MySQL Database
-- ========================================================

CREATE DATABASE IF NOT EXISTS `tokoonline_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tokoonline_db`;

-- --------------------------------------------------------
-- 1. TABEL CATEGORIES
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `image` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `categories` (`slug`, `name`, `description`, `image`) VALUES
('Fashion', 'Fashion', 'Koleksi busana berbahan organik & desain timeless.', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'),
('Shoes', 'Shoes', 'Sepatu platform & sneakers ergonomis modern.', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'),
('Accessories', 'Accessories', 'Jam tangan, kacamata & aksesori minimalis.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'),
('Bags', 'Bags', 'Tas ransel & tote bag berbahan kulit ramah lingkungan.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80');

-- --------------------------------------------------------
-- 2. TABEL PRODUCTS
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `category_slug` VARCHAR(50) NOT NULL,
  `price` DECIMAL(12,2) NOT NULL,
  `original_price` DECIMAL(12,2) DEFAULT NULL,
  `rating` DECIMAL(3,2) DEFAULT 5.0,
  `reviews_count` INT DEFAULT 0,
  `image` VARCHAR(500) NOT NULL,
  `description` TEXT,
  `is_new` TINYINT(1) DEFAULT 0,
  `is_promo` TINYINT(1) DEFAULT 0,
  `in_stock` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_slug`) REFERENCES `categories`(`slug`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data Seed 12 Produk
INSERT INTO `products` (`code`, `name`, `category_slug`, `price`, `original_price`, `rating`, `reviews_count`, `image`, `description`, `is_new`, `is_promo`, `in_stock`) VALUES
('prod-1', 'Eco Edition Backpack Pro', 'Bags', 899000.00, 1199000.00, 4.90, 128, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', 'Tas ransel ergonomis dengan bahan 100% serat daur ulang tahan air. Dilengkapi kompartemen laptop 16 inci.', 1, 1, 1),
('prod-2', 'White Platform Minimalist Sneakers', 'Shoes', 1299000.00, 1499000.00, 4.95, 210, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80', 'Sneakers platform kulit sintetis premium bernapas dengan bantalan sole empuk.', 1, 1, 1),
('prod-3', 'Minimalist Chronograph Smart Watch', 'Accessories', 1899000.00, 2199000.00, 4.88, 95, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', 'Jam tangan pintar dengan strap kulit asli Italia, fitur monitor kesehatan dan bodi stainless steel.', 0, 1, 1),
('prod-4', 'Organic Linen Earth Shirt', 'Fashion', 599000.00, 699000.00, 4.82, 64, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80', 'Kemeja berbahan 100% serat linen organik yang sejuk dan ramah lingkungan.', 1, 0, 1),
('prod-5', 'Structured Canvas Tote Bag', 'Bags', 449000.00, 549000.00, 4.79, 142, 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', 'Tote bag kanvas tebal tahan karat dengan kantong rahasia di dalam.', 0, 1, 1),
('prod-6', 'Aviation Polarized Sunglasses', 'Accessories', 799000.00, 999000.00, 4.90, 88, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', 'Kacamata hitam terpolarisasi perlindungan UV400 frame titanium ultra-ringan.', 1, 1, 1),
('prod-7', 'Minimalist Running Shoes', 'Shoes', 1199000.00, 1399000.00, 4.86, 175, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', 'Sepatu lari fleksibel dengan teknologi mesh responsif untuk kenyamanan maksimal.', 0, 1, 1),
('prod-8', 'Classic Cotton Crewneck Sweatshirt', 'Fashion', 499000.00, 599000.00, 4.75, 52, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 'Sweatshirt berbahan 100% katun fleece rajut halus dengan fleksibilitas tinggi.', 0, 0, 1),
('prod-9', 'Heavyweight Oversized Organic Hoodie', 'Fashion', 749000.00, 899000.00, 4.91, 110, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 'Hoodie berbahan katun organik tebal 450 GSM dengan potongan boxy oversized.', 1, 1, 1),
('prod-10', 'Smart Active Fitness Watch', 'Accessories', 2299000.00, 2699000.00, 4.89, 87, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80', 'Smartwatch olahraga presisi tinggi dengan pelacak detak jantung dan SpO2.', 1, 0, 1),
('prod-11', 'Crossbody Sling Modular Bag', 'Bags', 599000.00, 749000.00, 4.87, 93, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', 'Tas selempang praktis modular berbahan Cordura tahan air dengan pengunci magnetik.', 0, 1, 1),
('prod-12', 'Minimalist Leather Loafers', 'Shoes', 1499000.00, 1799000.00, 4.93, 78, 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80', 'Sepatu loafer kulit asli dengan desain slip-on elegan dan insole empuk.', 1, 0, 1);

-- --------------------------------------------------------
-- 3. TABEL ORDERS
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(50) NOT NULL UNIQUE,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_email` VARCHAR(100) NOT NULL,
  `customer_phone` VARCHAR(20) NOT NULL,
  `shipping_address` TEXT NOT NULL,
  `total_amount` DECIMAL(12,2) NOT NULL,
  `payment_status` ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  `order_status` ENUM('processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'processing',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- 4. TABEL ORDER_ITEMS
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `price` DECIMAL(12,2) NOT NULL,
  `selected_color` VARCHAR(50),
  `selected_size` VARCHAR(50),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
