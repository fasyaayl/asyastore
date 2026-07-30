import { UserAccount, OrderHistoryItem } from '../types';

const USERS_KEY = 'ecostore_users';
const CURRENT_USER_KEY = 'ecostore_current_user';

// Initial seed default user for instant testing
const DEFAULT_USER: UserAccount = {
  fullName: 'Ahmad Fadhil',
  username: 'ahmadfadhil',
  email: 'ahmad.fadhil@example.com',
  phone: '081234567890',
  password: 'password123',
  createdAt: new Date().toISOString(),
};

// Seed users if empty
export const initializeAuthStorage = (): void => {
  if (typeof window === 'undefined') return;
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_USER]));
  }
};

export const getStoredUsers = (): UserAccount[] => {
  if (typeof window === 'undefined') return [DEFAULT_USER];
  initializeAuthStorage();
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [DEFAULT_USER];
  } catch (err) {
    console.error('Failed to parse users from localStorage', err);
    return [DEFAULT_USER];
  }
};

export const getCurrentUser = (): UserAccount | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Failed to parse current user', err);
    return null;
  }
};

export const setCurrentUser = (user: UserAccount | null): void => {
  if (typeof window === 'undefined') return;
  if (user) {
    // Exclude password when storing in active session
    const { password, ...safeUser } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const logoutUser = (): void => {
  setCurrentUser(null);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const registerUser = (
  userData: Omit<UserAccount, 'createdAt'>
): { success: boolean; message: string; user?: UserAccount } => {
  const { fullName, username, email, phone, password } = userData;

  // Validation 1: Required fields
  if (!fullName.trim() || !username.trim() || !email.trim() || !phone.trim() || !password) {
    return { success: false, message: 'Semua field wajib diisi.' };
  }

  // Validation 2: Email format
  if (!validateEmail(email.trim())) {
    return { success: false, message: 'Format email tidak valid.' };
  }

  // Validation 3: Minimum password length
  if (password.length < 8) {
    return { success: false, message: 'Password minimal 8 karakter.' };
  }

  const users = getStoredUsers();

  // Validation 4: Duplicate email check
  const existingEmail = users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (existingEmail) {
    return { success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain.' };
  }

  // Validation 5: Duplicate username check
  const existingUsername = users.find(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase()
  );
  if (existingUsername) {
    return { success: false, message: 'Username sudah digunakan. Silakan pilih username lain.' };
  }

  const newUser: UserAccount = {
    fullName: fullName.trim(),
    username: username.trim().toLowerCase(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return {
    success: true,
    message: 'Registrasi berhasil! Silakan masuk ke akun Anda.',
    user: newUser,
  };
};

export const loginUser = (
  identifier: string,
  password: string,
  _rememberMe: boolean = false
): { success: boolean; message: string; user?: UserAccount } => {
  if (!identifier.trim() || !password) {
    return { success: false, message: 'Email/Username dan Password wajib diisi.' };
  }

  const users = getStoredUsers();
  const cleanId = identifier.trim().toLowerCase();

  const user = users.find(
    (u) => u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId
  );

  if (!user) {
    return { success: false, message: 'Akun tidak ditemukan. Silakan periksa kembali email/username Anda.' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Password yang Anda masukkan salah.' };
  }

  setCurrentUser(user);

  return {
    success: true,
    message: `Selamat datang kembali, ${user.fullName}!`,
    user,
  };
};

// Initial mock orders for user
export const getSampleOrders = (): OrderHistoryItem[] => {
  return [
    {
      id: 'ORD-20260728-01',
      date: '28 Jul 2026',
      totalAmount: 1299000,
      status: 'Selesai',
      itemsCount: 1,
      items: [],
    },
    {
      id: 'ORD-20260715-04',
      date: '15 Jul 2026',
      totalAmount: 899000,
      status: 'Dikirim',
      itemsCount: 1,
      items: [],
    },
  ];
};
