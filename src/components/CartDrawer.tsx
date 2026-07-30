import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Truck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g. 0.4 for 40%
  const [couponMsg, setCouponMsg] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1000000; // Rp 1.000.000
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const discountAmount = subtotal * appliedDiscount;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25000;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'ECO40' || couponCode.toUpperCase() === 'ECO40PROMO') {
      setAppliedDiscount(0.4);
      setCouponMsg('Diskon 40% Berhasil Diterapkan!');
    } else {
      setCouponMsg('Kode voucher tidak valid.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#ECEAE5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#111111]" />
            <h3 className="font-extrabold text-lg text-[#111111]">Keranjang Belanja</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#F8F6F2] text-xs font-bold text-[#111111]">
              {cartItems.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-500 hover:bg-[#F8F6F2] hover:text-[#111111] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#F8F6F2] px-5 py-3 border-b border-[#ECEAE5]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#111111] mb-1.5">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#2D5A27]" />
              <span>
                {subtotal >= freeShippingThreshold
                  ? 'Selamat! Anda Mendapatkan Gratis Ongkir'
                  : `Tambah Rp ${(freeShippingThreshold - subtotal).toLocaleString('id-ID')} lagi untuk Gratis Ongkir`}
              </span>
            </div>
            <span>{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full h-2 bg-[#ECEAE5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2D5A27] transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-[#ECEAE5] soft-shadow"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-xl border border-[#ECEAE5]"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#111111] truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 mb-1">
                    Rp {item.product.price.toLocaleString('id-ID')}
                  </p>
                  
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-6 h-6 rounded-lg bg-[#F8F6F2] hover:bg-gray-200 flex items-center justify-center text-xs font-bold"
                    >
                      <Minus className="w-3 h-3 text-[#111111]" />
                    </button>
                    <span className="text-xs font-bold px-1">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-6 h-6 rounded-lg bg-[#F8F6F2] hover:bg-gray-200 flex items-center justify-center text-xs font-bold"
                    >
                      <Plus className="w-3 h-3 text-[#111111]" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch">
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <p className="text-xs font-extrabold text-[#111111]">
                    Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-bold text-[#111111] mb-1">Keranjang Masih Kosong</p>
              <p className="text-xs">Jelajahi katalog dan tambahkan produk impianmu.</p>
            </div>
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#ECEAE5] bg-[#F8F6F2] space-y-3">
            
            {/* Coupon form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Kode Voucher (ex: ECO40)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-white border border-[#ECEAE5] text-xs text-[#111111] placeholder-gray-400 pl-8 pr-3 py-2 rounded-xl focus:outline-none focus:border-[#111111]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#111111] text-white font-bold text-xs rounded-xl hover:bg-[#222222]"
              >
                Gunakan
              </button>
            </form>
            {couponMsg && (
              <p className={`text-[11px] font-bold ${appliedDiscount > 0 ? 'text-[#2D5A27]' : 'text-red-500'}`}>
                {couponMsg}
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-[#ECEAE5]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#111111]">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#2D5A27]">
                  <span>Diskon Voucher ({appliedDiscount * 100}%)</span>
                  <span className="font-bold">- Rp {discountAmount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Ongkos Kirim</span>
                <span className="font-semibold text-[#111111]">
                  {shippingFee === 0 ? 'GRATIS' : `Rp ${shippingFee.toLocaleString('id-ID')}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-[#111111] pt-2 border-t border-[#ECEAE5]">
                <span>Total Bayar</span>
                <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-4 bg-[#111111] text-white font-extrabold text-sm rounded-[14px] flex items-center justify-center gap-2 hover:bg-[#222222] transition-all cursor-pointer shadow-md active:scale-95"
            >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
