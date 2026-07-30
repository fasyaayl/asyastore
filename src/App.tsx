import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { PopularCategories } from './components/PopularCategories';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AuthModal } from './components/AuthModal';
import { Toast, ToastMessage } from './components/Toast';

import { PRODUCTS } from './data/mockData';
import { Product, CartItem, UserAccount } from './types';
import { getCurrentUser, logoutUser, initializeAuthStorage } from './utils/auth';

export default function App() {
  useEffect(() => {
    initializeAuthStorage();
  }, []);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');

  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Initial sample item in cart for quick testing & delight
    { product: PRODUCTS[0], quantity: 1, selectedColor: 'Oatmeal Beige', selectedSize: 'One Size' }
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-2']);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Auth Handlers
  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    showToast('info', 'Anda telah keluar dari akun.');
  };

  const handleOpenUserModal = () => {
    if (!currentUser) {
      handleOpenAuth('login');
    } else {
      setIsUserOpen(true);
    }
  };

  // Toast notifications state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (type: 'cart' | 'wishlist' | 'info', message: string) => {
    const id = Date.now().toString();
    setToast({ id, type, message });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3000);
  };

  // Add to Cart
  const handleAddToCart = (product: Product, selectedColor?: string, selectedSize?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, selectedColor, selectedSize }];
    });
    showToast('cart', `"${product.name}" ditambahkan ke keranjang.`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Item from Cart
  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('info', 'Produk dihapus dari keranjang.');
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast('info', `"${product.name}" dihapus dari wishlist.`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast('wishlist', `"${product.name}" disimpan ke wishlist.`);
        return [...prev, product.id];
      }
    });
  };

  // Select category & smooth scroll down to products
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Wishlist product items list
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-white text-[#111111] font-['Inter',sans-serif] flex flex-col selection:bg-[#111111] selection:text-white">

      {/* Sticky Glass Navbar */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenUser={handleOpenUserModal}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        allProducts={PRODUCTS}
        onSelectProduct={(product) => setQuickViewProduct(product)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <Hero
          onShopNow={() => {
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewCollection={() => {
            const el = document.getElementById('categories');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* FEATURE CARDS (3 Cards) */}
        <Features />

        {/* POPULAR CATEGORIES (4 Modern Cards) */}
        <PopularCategories onSelectCategory={handleCategorySelect} />

        {/* FEATURED PRODUCTS (Grid with Filters & Sort) */}
        <FeaturedProducts
          products={PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={(p) => handleAddToCart(p)}
          onQuickView={(p) => setQuickViewProduct(p)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* Quick View Product Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderComplete={() => {
          setCartItems([]);
          showToast('info', 'Pesanan Anda berhasil dikonfirmasi!');
        }}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isUserOpen}
        onClose={() => setIsUserOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Authentication Modal (Login & Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authInitialMode}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
        showToast={showToast}
      />

      {/* Floating Notification Toast */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

    </div>
  );
}
