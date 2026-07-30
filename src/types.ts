export interface Product {
  id: string;
  name: string;
  category: 'Fashion' | 'Shoes' | 'Accessories' | 'Bags';
  price: number; // in IDR (e.g., 899000)
  originalPrice?: number;
  rating: number; // e.g. 4.9
  reviewsCount: number;
  image: string;
  gallery?: string[];
  isNew?: boolean;
  isPromo?: boolean;
  description: string;
  specs?: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  itemCount: number;
  image: string;
  description: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: 'truck' | 'shield' | 'headphones';
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export interface UserAccount {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password?: string;
  createdAt: string;
}

export interface OrderHistoryItem {
  id: string;
  date: string;
  totalAmount: number;
  status: 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';
  itemsCount: number;
  items: CartItem[];
}
