import React, { useState } from 'react';
import { X, Package, Award, Phone, Mail, User as UserIcon, LogOut, Heart, Clock } from 'lucide-react';
import { UserAccount } from '../types';
import { getSampleOrders } from '../utils/auth';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
  onOpenWishlist: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  onOpenWishlist,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  if (!isOpen || !currentUser) return null;

  const orders = getSampleOrders();
  const initials = currentUser.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in" />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-[28px] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-[#ECEAE5]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#ECEAE5] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-black text-lg shadow-sm">
              {initials}
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-base text-[#111111] truncate">{currentUser.fullName}</h3>
              <p className="text-xs text-gray-500 truncate">@{currentUser.username}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-[#111111] hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#ECEAE5] bg-[#F5F2EB]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2.5 text-xs font-bold transition-all relative ${
              activeTab === 'profile' ? 'text-[#111111] bg-white' : 'text-gray-500 hover:text-[#111111]'
            }`}
          >
            Info Profil
            {activeTab === 'profile' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#111111]" />}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2.5 text-xs font-bold transition-all relative ${
              activeTab === 'orders' ? 'text-[#111111] bg-white' : 'text-gray-500 hover:text-[#111111]'
            }`}
          >
            Riwayat Pesanan ({orders.length})
            {activeTab === 'orders' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#111111]" />}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Member Card */}
              <div className="bg-[#111111] text-white rounded-2xl p-4 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#88C070]" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Status Akun</p>
                    <p className="text-sm font-black text-white">EcoStore Gold Member</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400">Total Poin</p>
                  <p className="text-sm font-extrabold text-[#88C070]">1,850 Pts</p>
                </div>
              </div>

              {/* Account Details Box */}
              <div className="bg-[#F8F6F2] rounded-2xl p-4 space-y-3 border border-[#ECEAE5]">
                <div className="flex items-center gap-3 text-xs">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Email</p>
                    <p className="font-semibold text-[#111111] truncate">{currentUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs pt-2 border-t border-[#ECEAE5]">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Nomor Telepon</p>
                    <p className="font-semibold text-[#111111]">{currentUser.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs pt-2 border-t border-[#ECEAE5]">
                  <UserIcon className="w-4 h-4 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Username</p>
                    <p className="font-semibold text-[#111111]">@{currentUser.username}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-1 pt-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className="w-full p-3 hover:bg-[#F8F6F2] rounded-xl flex items-center justify-between text-xs font-bold text-[#111111] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span>Lihat Riwayat Pesanan ({orders.length})</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenWishlist();
                  }}
                  className="w-full p-3 hover:bg-[#F8F6F2] rounded-xl flex items-center justify-between text-xs font-bold text-[#111111] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span>Favorit & Wishlist</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-[#F8F6F2] rounded-2xl p-4 border border-[#ECEAE5] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#111111]">{ord.id}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.status === 'Selesai'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {ord.date}
                    </span>
                    <span className="font-bold text-[#111111]">
                      Rp {ord.totalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#ECEAE5] flex justify-between items-center">
          <button
            onClick={handleLogout}
            className="text-xs font-extrabold text-red-600 flex items-center gap-1.5 hover:underline cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun (Logout)</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#111111] text-white font-bold text-xs rounded-xl hover:bg-[#222222] transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
