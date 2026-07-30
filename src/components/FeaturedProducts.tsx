import React, { useState } from 'react';
import { Product, SortOption } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [sortOption, setSortOption] = useState<SortOption>('featured');

  const categories = ['Semua', 'Fashion', 'Shoes', 'Accessories', 'Bags', 'Promo'];

  // Filter products by selected category/promo
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'Semua') return true;
    if (selectedCategory === 'Promo') return p.isPromo;
    return p.category === selectedCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0; // default featured
  });

  return (
    <section id="products" className="w-full py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#6B7280] uppercase mb-1 block">
              DESAIN MODERN & SELEKTIF
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Produk Unggulan
            </h2>
          </div>
        </div>

        {/* Filter Tabs & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#ECEAE5] mb-8 gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-md'
                      : 'bg-[#F8F6F2] text-[#6B7280] hover:bg-[#EFECE6] hover:text-[#111111]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <ArrowUpDown className="w-4 h-4 text-[#6B7280]" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-[#F8F6F2] border border-[#ECEAE5] text-xs font-bold text-[#111111] rounded-xl px-3 py-2 focus:outline-none focus:border-[#111111] cursor-pointer"
            >
              <option value="featured">Urutkan: Terpopuler</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="price-asc">Harga: Terendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Terendah</option>
            </select>
          </div>

        </div>

        {/* 4 Products per row responsive 12-column Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F8F6F2] rounded-[20px] border border-[#ECEAE5]">
            <p className="text-base font-bold text-[#111111] mb-2">
              Tidak ada produk ditemukan
            </p>
            <p className="text-xs text-[#6B7280] mb-4">
              Coba ubah kategori filter atau kata kunci pencarian Anda.
            </p>
            <button
              onClick={() => setSelectedCategory('Semua')}
              className="px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-bold hover:bg-[#222222]"
            >
              Tampilkan Semua Produk
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
