import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-[24px] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-[#ECEAE5]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#ECEAE5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <h3 className="font-extrabold text-lg text-[#111111]">Wishlist Saya</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#F8F6F2] text-xs font-bold text-[#111111]">
              {wishlistProducts.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-500 hover:bg-[#F8F6F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items list */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-[#ECEAE5] soft-shadow"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-16 h-16 object-cover rounded-xl border border-[#ECEAE5]"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#111111] truncate">{prod.name}</h4>
                  <p className="text-xs font-black text-[#111111] mt-0.5">
                    Rp {prod.price.toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(prod);
                      onRemoveFromWishlist(prod);
                    }}
                    className="p-2.5 rounded-xl bg-[#111111] text-white hover:bg-[#222222] text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                    title="Pindahkan ke Keranjang"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(prod)}
                    className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-20 text-red-500" />
              <p className="text-sm font-bold text-[#111111] mb-1">Belum Ada Produk Favorit</p>
              <p className="text-xs">Klik ikon hati pada produk untuk menyimpannya di sini.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8F6F2] border-t border-[#ECEAE5] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-bold hover:bg-[#222222]"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
