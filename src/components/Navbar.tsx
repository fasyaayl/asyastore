import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Leaf, X, ChevronRight, Menu } from 'lucide-react';
import { Product, UserAccount } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenUser: () => void;
  currentUser: UserAccount | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenUser,
  currentUser,
  onOpenAuth,
  searchQuery,
  setSearchQuery,
  allProducts,
  onSelectProduct,
  activeSection,
  setActiveSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks = [
    { name: 'Beranda', id: 'hero' },
    { name: 'Kategori', id: 'categories' },
    { name: 'Terbaru', id: 'products' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'glass-navbar py-2' : 'bg-white border-b border-[#ECEAE5] py-3'
      }`}
      style={{ height: '72px' }}
    >
      <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-[#111111] flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Leaf className="w-5 h-5 text-[#88C070]" />
            </div>
            <span className="font-black text-xl tracking-tight text-[#111111]">
              AsyaStore
            </span>
          </button>
        </div>

        {/* Center: Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  isActive ? 'text-[#111111] font-semibold' : 'text-[#6B7280] hover:text-[#111111]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#111111] rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Search Box + Action Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Large Search Box */}
          <div className="relative hidden sm:block w-48 md:w-64 lg:w-72">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-[#F8F6F2] hover:bg-[#F2EFE8] focus:bg-white text-sm text-[#111111] placeholder-[#6B7280] pl-10 pr-8 py-2 rounded-xl border border-[#ECEAE5] focus:border-[#111111] focus:outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 p-0.5 rounded-full hover:bg-gray-200 text-[#6B7280] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Dropdown Predictions */}
            {isSearchFocused && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#ECEAE5] soft-shadow p-2 z-50 max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        onSelectProduct(prod);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center gap-3 p-2 hover:bg-[#F8F6F2] rounded-xl transition-colors text-left"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-10 h-10 object-cover rounded-lg border border-[#ECEAE5]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#111111] truncate">{prod.name}</p>
                        <p className="text-[11px] text-[#6B7280]">
                          Rp {prod.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-[#6B7280]">
                    Tidak ada produk ditemukan untuk "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Icon with count badge */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-xl text-[#111111] hover:bg-[#F8F6F2] transition-colors cursor-pointer group"
            title="Wishlist"
          >
            <Heart className="w-5.5 h-5.5 text-[#111111] transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-white border border-gray-300 text-[#111111] text-[10px] font-bold flex items-center justify-center shadow-xs">
              {wishlistCount}
            </span>
          </button>

          {/* User Profile or Login/Register Buttons */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenUser}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl text-[#111111] hover:bg-[#F8F6F2] transition-colors cursor-pointer group"
                title="Akun Saya"
              >
                <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-[#111111] truncate max-w-[110px]">
                  Halo, {currentUser.fullName.split(' ')[0]}
                </span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-2 text-xs font-bold text-[#111111] hover:bg-[#F8F6F2] rounded-xl transition-all cursor-pointer"
              >
                Masuk
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 text-xs font-bold bg-[#111111] text-white hover:bg-[#222222] rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
              >
                Daftar
              </button>
            </div>
          )}

          {/* Shopping Cart Icon (Solid Black Rounded Box) */}
          <button
            onClick={onOpenCart}
            className="relative w-10 h-10 rounded-xl bg-[#111111] text-white hover:bg-[#222222] transition-all cursor-pointer shadow-xs flex items-center justify-center group active:scale-95"
            title="Keranjang Belanja"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E53E3E] text-white text-[11px] font-black flex items-center justify-center border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-xl text-[#111111] hover:bg-[#F8F6F2]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#ECEAE5] px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F6F2] text-sm text-[#111111] placeholder-[#6B7280] pl-10 pr-4 py-2.5 rounded-xl border border-[#ECEAE5]"
            />
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left font-semibold text-sm text-[#111111] py-2 px-3 rounded-lg hover:bg-[#F8F6F2]"
              >
                {link.name}
              </button>
            ))}

            <div className="pt-2 border-t border-[#ECEAE5]">
              {currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenUser();
                  }}
                  className="w-full flex items-center justify-between font-bold text-sm text-[#111111] py-2 px-3 rounded-lg bg-[#F8F6F2]"
                >
                  <span>Halo, {currentUser.fullName}</span>
                  <span className="text-xs text-gray-500 font-normal">Lihat Profil →</span>
                </button>
              ) : (
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="flex-1 py-2 text-xs font-bold text-[#111111] bg-[#F8F6F2] rounded-xl text-center"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('register');
                    }}
                    className="flex-1 py-2 text-xs font-bold bg-[#111111] text-white rounded-xl text-center"
                  >
                    Daftar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
