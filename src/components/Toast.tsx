import React from 'react';
import { CheckCircle2, Heart, ShoppingBag, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info';
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#111111] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-gray-800 flex items-center gap-3 max-w-sm">
        {toast.type === 'cart' && <ShoppingBag className="w-5 h-5 text-[#88C070]" />}
        {toast.type === 'wishlist' && <Heart className="w-5 h-5 text-red-400 fill-current" />}
        {toast.type === 'info' && <CheckCircle2 className="w-5 h-5 text-[#88C070]" />}

        <span className="text-xs font-bold flex-1">{toast.message}</span>

        <button
          onClick={onDismiss}
          className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
