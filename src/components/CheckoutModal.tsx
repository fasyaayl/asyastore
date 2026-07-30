import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, MapPin, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Ahmad Fadhil',
    phone: '0812-3456-7890',
    address: 'Jl. Sudirman No. 45, Kebayoran Baru',
    city: 'Jakarta Selatan',
    paymentMethod: 'qris',
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const grandTotal = subtotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in" />

      <div className="relative w-full max-w-xl bg-white rounded-[24px] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-[#ECEAE5]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#ECEAE5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2D5A27]" />
            <h3 className="font-extrabold text-lg text-[#111111]">
              {step === 'form' ? 'Pembayaran Aman EcoStore' : 'Pesanan Dikonfirmasi'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-500 hover:bg-[#F8F6F2]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Contact & Address */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>Alamat Pengiriman</span>
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#F8F6F2] border border-[#ECEAE5] text-xs font-semibold px-3.5 py-2.5 rounded-xl text-[#111111]"
                />
                <input
                  type="text"
                  required
                  placeholder="Nomor Telepon"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-[#F8F6F2] border border-[#ECEAE5] text-xs font-semibold px-3.5 py-2.5 rounded-xl text-[#111111]"
                />
              </div>

              <input
                type="text"
                required
                placeholder="Alamat Lengkap"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#F8F6F2] border border-[#ECEAE5] text-xs font-semibold px-3.5 py-2.5 rounded-xl text-[#111111]"
              />

              <input
                type="text"
                required
                placeholder="Kota / Kabupaten"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#F8F6F2] border border-[#ECEAE5] text-xs font-semibold px-3.5 py-2.5 rounded-xl text-[#111111]"
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <span>Metode Pembayaran</span>
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'qris', name: 'QRIS Instant' },
                  { id: 'bank', name: 'Transfer Bank' },
                  { id: 'cod', name: 'COD (Bayar di Tempat)' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      formData.paymentMethod === m.id
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-[#F8F6F2] text-[#111111] border-[#ECEAE5] hover:border-[#111111]'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-[#F8F6F2] rounded-2xl border border-[#ECEAE5] space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Total Belanja ({cartItems.length} item)</span>
                <span className="font-extrabold text-[#111111]">Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-[#2D5A27] font-semibold">
                <span>Pengiriman Ekspedisi</span>
                <span>GRATIS ONGKIR</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#111111] text-white font-extrabold text-sm rounded-[14px] hover:bg-[#222222] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Bayar Sekarang • Rp {grandTotal.toLocaleString('id-ID')}
            </button>

          </form>
        ) : (
          <div className="p-8 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-[#111111]">
              Pembayaran Berhasil!
            </h3>

            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              Terima kasih, <span className="font-bold text-[#111111]">{formData.name}</span>. Pesanan Anda dengan ID <span className="font-mono font-bold text-[#111111]">#ECO-{Math.floor(100000 + Math.random() * 900000)}</span> sedang diproses dan dikemas dengan rapi.
            </p>

            <div className="p-4 bg-[#F8F6F2] rounded-2xl border border-[#ECEAE5] text-left text-xs space-y-1 text-gray-600">
              <p><span className="font-bold text-[#111111]">Pengiriman ke:</span> {formData.address}, {formData.city}</p>
              <p><span className="font-bold text-[#111111]">Estimasi Sampai:</span> 1 - 2 Hari Kerja</p>
            </div>

            <button
              onClick={() => {
                onOrderComplete();
                onClose();
                setStep('form');
              }}
              className="w-full py-3.5 bg-[#111111] text-white font-bold text-xs rounded-xl hover:bg-[#222222]"
            >
              Selesai & Kembali Belanja
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
