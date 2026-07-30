<?php
require_once __DIR__ . '/config.php';

// Ambil data produk dari database MySQL
$categoryFilter = $_GET['category'] ?? 'all';

if ($categoryFilter !== 'all') {
    $stmt = $pdo->prepare("SELECT * FROM products WHERE category_slug = ? ORDER BY id ASC");
    $stmt->execute([$categoryFilter]);
} else {
    $stmt = $pdo->query("SELECT * FROM products ORDER BY id ASC");
}

$products = $stmt->fetchAll();

// Ambil daftar kategori
$stmtCat = $pdo->query("SELECT * FROM categories ORDER BY name ASC");
$categories = $stmtCat->fetchAll();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toko Online PHP & MySQL</title>
    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #FAFAFA; color: #111111; }
    </style>
</head>
<body class="min-h-screen flex flex-col">

    <!-- Header Navigation -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center font-black text-lg">
                    T
                </div>
                <div>
                    <h1 class="text-lg font-black text-[#111111] leading-none">TOKO ONLINE</h1>
                    <span class="text-[10px] font-bold text-[#2D5A27] uppercase tracking-wider">PHP + MySQL Edition</span>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <a href="#katalog" class="text-sm font-bold text-gray-700 hover:text-black">Katalog Produk</a>
                <a href="api/products.php" target="_blank" class="text-xs px-3 py-1.5 rounded-lg bg-gray-100 font-mono text-gray-600 hover:bg-gray-200">API JSON</a>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-white py-12 border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="max-w-xl">
                <span class="inline-block px-3 py-1 rounded-full bg-green-100 text-[#2D5A27] text-xs font-bold mb-4">
                    Koneksi Database Aktif (MySQL)
                </span>
                <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                    Temukan Produk <span class="text-[#2D5A27]">Terbaik</span> untukmu
                </h2>
                <p class="mt-3 text-sm sm:text-base text-gray-600">
                    Sistem toko online ini berjalan menggunakan PHP & MySQL secara dinamis.
                </p>
            </div>
            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-xs space-y-2 text-gray-600 font-mono w-full md:w-auto">
                <p><strong>Database:</strong> tokoonline_db</p>
                <p><strong>Status PHP:</strong> <?php echo phpversion(); ?></p>
                <p><strong>Total Produk:</strong> <?php echo count($products); ?> Items</p>
            </div>
        </div>
    </section>

    <!-- Filter Category Tabs -->
    <main id="katalog" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h3 class="text-xl font-bold text-[#111111]">Daftar Produk (<?php echo count($products); ?>)</h3>
            
            <div class="flex flex-wrap gap-2">
                <a href="index.php#katalog" class="px-4 py-2 rounded-xl text-xs font-bold border transition-all <?php echo $categoryFilter === 'all' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'; ?>">
                    Semua
                </a>
                <?php foreach ($categories as $cat): ?>
                    <a href="index.php?category=<?php echo urlencode($cat['slug']); ?>#katalog" 
                       class="px-4 py-2 rounded-xl text-xs font-bold border transition-all <?php echo $categoryFilter === $cat['slug'] ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'; ?>">
                        <?php echo htmlspecialchars($cat['name']); ?>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <?php if (empty($products)): ?>
                <div class="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                    <p class="text-gray-500 font-medium">Tidak ada produk dalam kategori ini.</p>
                </div>
            <?php else: ?>
                <?php foreach ($products as $p): ?>
                    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col">
                        <div class="relative aspect-square bg-gray-100 overflow-hidden">
                            <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="<?php echo htmlspecialchars($p['name']); ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                            <?php if ($p['is_promo']): ?>
                                <span class="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">PROMO</span>
                            <?php endif; ?>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1"><?php echo htmlspecialchars($p['category_slug']); ?></span>
                            <h4 class="font-bold text-[#111111] text-base mb-2 line-clamp-1 group-hover:text-[#2D5A27] transition-colors">
                                <?php echo htmlspecialchars($p['name']); ?>
                            </h4>
                            <p class="text-xs text-gray-500 line-clamp-2 mb-4">
                                <?php echo htmlspecialchars($p['description']); ?>
                            </p>
                            <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div>
                                    <span class="text-base font-extrabold text-[#111111]">
                                        Rp <?php echo number_format($p['price'], 0, ',', '.'); ?>
                                    </span>
                                    <?php if ($p['original_price']): ?>
                                        <span class="block text-xs text-gray-400 line-through">
                                            Rp <?php echo number_format($p['original_price'], 0, ',', '.'); ?>
                                        </span>
                                    <?php endif; ?>
                                </div>
                                <button onclick="alert('Item <?php echo htmlspecialchars($p['name']); ?> berhasil ditambahkan ke keranjang!')" class="px-3.5 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-[#2D5A27] transition-colors">
                                    + Beli
                                </button>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 py-8 text-center text-xs text-gray-500">
        <p>&copy; <?php echo date('Y'); ?> Toko Online PHP & MySQL Edition. Siap di-deploy ke CPanel / Hosting / XAMPP.</p>
    </footer>

</body>
</html>
