import React from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <div className="group relative bg-white rounded-[16px] border border-[#ECEAE5] p-4 soft-shadow soft-shadow-hover flex flex-col justify-between transition-all duration-300">
      
      {/* Top Image Container */}
      <div className="relative w-full aspect-square rounded-[12px] bg-[#F8F6F2] overflow-hidden mb-4 flex items-center justify-center">
        
        {/* Product Image with Zoom on Hover */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
          referrerPolicy="no-referrer"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-wider text-[#111111] uppercase shadow-xs">
            {product.category}
          </span>
          {product.isPromo && (
            <span className="px-2.5 py-1 rounded-full bg-[#111111] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
              PROMO
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 cursor-pointer shadow-sm ${
            isWishlisted
              ? 'bg-[#E53E3E] text-white scale-105'
              : 'bg-white/80 hover:bg-white text-[#111111] hover:scale-110'
          }`}
          title={isWishlisted ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={() => onQuickView(product)}
            className="px-4 py-2 rounded-full bg-white text-[#111111] text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-[#111111] hover:text-white transition-all cursor-pointer transform -translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Detail Produk</span>
          </button>
        </div>

      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-[#111111]">{product.rating}</span>
            <span className="text-[11px] text-[#6B7280]">({product.reviewsCount})</span>
          </div>

          {/* Product Title */}
          <h4
            onClick={() => onQuickView(product)}
            className="text-sm font-bold text-[#111111] hover:text-[#6B7280] transition-colors cursor-pointer line-clamp-1 mb-2 tracking-tight"
            title={product.name}
          >
            {product.name}
          </h4>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-[#ECEAE5] flex items-center justify-between gap-2 mt-2">
          
          <div>
            <div className="text-sm font-black text-[#111111]">
              Rp {product.price.toLocaleString('id-ID')}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-[#6B7280] line-through font-normal">
                Rp {product.originalPrice.toLocaleString('id-ID')}
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product)}
            className="p-2.5 rounded-[12px] bg-[#F8F6F2] hover:bg-[#111111] hover:text-white text-[#111111] border border-[#ECEAE5] transition-all duration-300 cursor-pointer active:scale-90 group/btn"
            title="Tambah ke Keranjang"
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          </button>

        </div>

      </div>

    </div>
  );
};
