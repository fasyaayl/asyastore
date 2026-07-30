import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Loader2, Leaf, ArrowRight, ShieldCheck } from 'lucide-react';
import { registerUser, loginUser, validateEmail } from '../utils/auth';
import { UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess: (user: UserAccount) => void;
  showToast: (type: 'cart' | 'wishlist' | 'info', message: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
  showToast,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);

  // Form states
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [identifier, setIdentifier] = useState(''); // Email or Username for Login
  const [rememberMe, setRememberMe] = useState(true);

  // UI helpers
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const resetForms = () => {
    setFullName('');
    setUsername('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setIdentifier('');
    setErrorMessage(null);
  };

  const handleSwitchMode = (newMode: 'login' | 'register' | 'forgot') => {
    setErrorMessage(null);
    setMode(newMode);
  };

  // REGISTER HANDLER
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validations
    if (!fullName.trim() || !username.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      setErrorMessage('Semua field wajib diisi.');
      return;
    }

    if (!validateEmail(email.trim())) {
      setErrorMessage('Format email tidak valid (contoh: user@domain.com).');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password minimal 8 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password dan Konfirmasi Password tidak cocok.');
      return;
    }

    setIsLoading(true);

    // Simulate network request latency
    setTimeout(() => {
      const result = registerUser({
        fullName,
        username,
        email,
        phone,
        password,
      });

      setIsLoading(false);

      if (result.success) {
        showToast('info', 'Registrasi berhasil! Silakan masuk ke akun Anda.');
        resetForms();
        setMode('login');
      } else {
        setErrorMessage(result.message);
      }
    }, 700);
  };

  // LOGIN HANDLER
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim() || !password) {
      setErrorMessage('Email/Username dan Password wajib diisi.');
      return;
    }

    setIsLoading(true);

    // Simulate network request latency
    setTimeout(() => {
      const result = loginUser(identifier, password, rememberMe);

      setIsLoading(false);

      if (result.success && result.user) {
        showToast('info', result.message);
        onLoginSuccess(result.user);
        onClose();
        resetForms();
      } else {
        setErrorMessage(result.message);
      }
    }, 700);
  };

  // FORGOT PASSWORD HANDLER
  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !validateEmail(email.trim())) {
      setErrorMessage('Masukkan email terdaftar yang valid.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('info', `Link reset password telah dikirim ke ${email}.`);
      setMode('login');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Content Box */}
      <div className="relative w-full max-w-md bg-white rounded-[28px] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-[#ECEAE5] my-auto">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#ECEAE5] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center">
              <Leaf className="w-4 h-4 text-[#88C070]" />
            </div>
            <span className="font-extrabold text-lg text-[#111111]">EcoStore</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-[#111111] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Login vs Register) */}
        {mode !== 'forgot' && (
          <div className="flex border-b border-[#ECEAE5] bg-[#F5F2EB]">
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              className={`flex-1 py-3 text-sm font-bold transition-all relative ${
                mode === 'login'
                  ? 'text-[#111111] bg-white'
                  : 'text-gray-500 hover:text-[#111111]'
              }`}
            >
              Masuk
              {mode === 'login' && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#111111]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode('register')}
              className={`flex-1 py-3 text-sm font-bold transition-all relative ${
                mode === 'register'
                  ? 'text-[#111111] bg-white'
                  : 'text-gray-500 hover:text-[#111111]'
              }`}
            >
              Daftar Akun
              {mode === 'register' && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#111111]" />
              )}
            </button>
          </div>
        )}

        {/* Form Container */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
          
          {/* Error Alert Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4 animate-in fade-in duration-300">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Email atau Username
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Masukkan email atau username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-[#F8F6F2] hover:bg-[#F3EFEC] focus:bg-white text-sm text-[#111111] placeholder-gray-400 pl-10 pr-4 py-3 rounded-xl border border-[#ECEAE5] focus:border-[#111111] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-700">Password</label>
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('forgot')}
                    className="text-xs font-semibold text-[#2E6A38] hover:underline"
                  >
                    Lupa Password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Masukkan password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F8F6F2] hover:bg-[#F3EFEC] focus:bg-white text-sm text-[#111111] placeholder-gray-400 pl-10 pr-10 py-3 rounded-xl border border-[#ECEAE5] focus:border-[#111111] focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 p-1 text-gray-400 hover:text-[#111111]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#111111] focus:ring-black"
                  />
                  <span>Ingat saya</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-4 bg-[#111111] hover:bg-[#222222] text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk Ke Akun</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-3 text-center text-xs text-gray-500 font-medium">
                Belum punya akun?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('register')}
                  className="font-bold text-[#111111] hover:underline"
                >
                  Daftar Sekarang
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5 animate-in fade-in duration-300">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ahmad Fadhil"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F8F6F2] hover:bg-[#F3EFEC] focus:bg-white text-sm text-[#111111] placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-xl border border-[#ECEAE5] focus:border-[#111111] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: ahmadfadhil"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#F8F6F2] hover:bg-[#F3EFEC] focus:bg-white text-sm text-[#111111] placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-xl border border-[#ECEAE5] focus:border-[#111111] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="Contoh: ahmad@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8F6F2] hover:bg-[#F3EFEC] focus:bg-white text-sm text-[#111111] placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-xl border border-[#ECEAE5] focus:border-[#111111] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nomor Telepon
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8F6F2] hover:bg-[#F3EFEC] focus:bg-white text-sm text-[#111111] placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-xl border border-[#ECEAE5] focus:border-[#111111] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Password (min. 8 karakter)
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F8F6F2] hover:bg-[#F3EFEC] focus:bg-white text-sm text-[#111111] placeholder-gray-400 pl-10 pr-10 py-2.5 rounded-xl border border-[#ECEAE5] focus:border-[#111111] focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 p-1 text-gray-400 hover:text-[#111111]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Konfirmasi Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Ulangi password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#F8F6F2] hover:bg-[#F3EFEC] focus:bg-white text-sm text-[#111111] placeholder-gray-400 pl-10 pr-10 py-2.5 rounded-xl border border-[#ECEAE5] focus:border-[#111111] focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 p-1 text-gray-400 hover:text-[#111111]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 py-3 px-4 bg-[#111111] hover:bg-[#222222] text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Mendaftarkan...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#88C070]" />
                    <span>Daftar Akun</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-gray-500 font-medium">
                Sudah punya akun?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('login')}
                  className="font-bold text-[#111111] hover:underline"
                >
                  Masuk di sini
                </button>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-4 animate-in fade-in duration-300">
              <div className="text-center pb-2">
                <h4 className="font-extrabold text-base text-[#111111]">Reset Password</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Masukkan email akun Anda. Kami akan mengirimkan instruksi untuk menyetel ulang kata sandi.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Terdaftar</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8F6F2] hover:bg-[#F3EFEC] focus:bg-white text-sm text-[#111111] placeholder-gray-400 pl-10 pr-4 py-3 rounded-xl border border-[#ECEAE5] focus:border-[#111111] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#111111] hover:bg-[#222222] text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <span>Kirim Link Reset</span>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-gray-500 font-medium">
                Ingat password Anda?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('login')}
                  className="font-bold text-[#111111] hover:underline"
                >
                  Kembali ke Masuk
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
