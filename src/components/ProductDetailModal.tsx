import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color?: string, size?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-[24px] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-[#ECEAE5] max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Large Product Gallery */}
        <div className="w-full md:w-1/2 bg-[#F8F6F2] p-8 flex items-center justify-center relative min-h-[300px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full max-h-[360px] object-contain rounded-2xl shadow-md"
            referrerPolicy="no-referrer"
          />
          {product.isPromo && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-black uppercase">
              PROMO SPESIAL
            </span>
          )}
        </div>

        {/* Right Side: Product Specs & Actions */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-[#111111]">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} Ulasan)</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black text-[#111111] tracking-tight">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-[#111111]">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  Rp {product.originalPrice.toLocaleString('id-ID')}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="text-xs font-extrabold text-[#111111] uppercase tracking-wider block mb-2">
                  Pilihan Warna: <span className="text-gray-500 font-normal">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                        selectedColor === c.name ? 'border-[#111111] scale-110' : 'border-transparent'
                      }`}
                      title={c.name}
                    >
                      <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="text-xs font-extrabold text-[#111111] uppercase tracking-wider block mb-2">
                  Pilih Ukuran:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedSize === s
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-[#111111] border-[#ECEAE5] hover:border-[#111111]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantees */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A27]" />
                <span>100% Original</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#2D5A27]" />
                <span>Bebas Ongkir</span>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#ECEAE5] flex items-center gap-3 mt-6">
            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-3.5 rounded-[14px] border border-[#ECEAE5] transition-all cursor-pointer ${
                isWishlisted ? 'bg-red-50 text-red-500 border-red-200' : 'hover:bg-[#F8F6F2] text-[#111111]'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleAdd}
              className={`flex-1 py-3.5 rounded-[14px] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ${
                addedSuccess
                  ? 'bg-[#2D5A27] text-white'
                  : 'bg-[#111111] text-white hover:bg-[#222222]'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Berhasil Ditambahkan!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Tambah ke Keranjang</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
