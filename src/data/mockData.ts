import { Product, CategoryItem, FeatureItem } from '../types';

import heroShowcaseImg from '../assets/images/hero_showcase_1785406162014.jpg';
import catFashionImg from '../assets/images/cat_fashion_1785406178386.jpg';
import catShoesImg from '../assets/images/cat_shoes_1785406192475.jpg';
import catAccessoriesImg from '../assets/images/cat_accessories_1785406205149.jpg';
import catBagsImg from '../assets/images/cat_bags_1785406224679.jpg';

export const HERO_IMAGE = heroShowcaseImg;

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: 'feat-1',
    title: 'Pengiriman Cepat',
    description: 'Tersedia di seluruh Indonesia',
    iconName: 'truck',
  },
  {
    id: 'feat-2',
    title: 'Produk Original',
    description: 'Jaminan kualitas terukur',
    iconName: 'shield',
  },
  {
    id: 'feat-3',
    title: 'Layanan Premium',
    description: 'Dukungan ramah 24/7',
    iconName: 'headphones',
  },
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'Fashion',
    name: 'Fashion',
    itemCount: 48,
    image: catFashionImg,
    description: 'Koleksi busana berbahan organik & desain timeless.',
  },
  {
    id: 'Shoes',
    name: 'Shoes',
    itemCount: 32,
    image: catShoesImg,
    description: 'Sepatu platform & sneakers ergonomis modern.',
  },
  {
    id: 'Accessories',
    name: 'Accessories',
    itemCount: 29,
    image: catAccessoriesImg,
    description: 'Jam tangan, kacamata & aksesori minimalis.',
  },
  {
    id: 'Bags',
    name: 'Bags',
    itemCount: 24,
    image: catBagsImg,
    description: 'Tas ransel & tote bag berbahan kulit ramah lingkungan.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Eco Edition Backpack Pro',
    category: 'Bags',
    price: 899000,
    originalPrice: 1199000,
    rating: 4.9,
    reviewsCount: 128,
    image: catBagsImg,
    isNew: true,
    isPromo: true,
    description: 'Tas ransel ergonomis dengan bahan 100% serat daur ulang tahan air. Dilengkapi kompartemen laptop 16 inci dan bantalan empuk.',
    specs: [
      'Kapasitas: 22 Liter',
      'Bahan: Recycled Ocean Polyester',
      'Waterproof Zipper YKK',
      'Garansi Seumur Hidup'
    ],
    colors: [
      { name: 'Oatmeal Beige', hex: '#E6E2DD' },
      { name: 'Charcoal Black', hex: '#1C1C1C' },
      { name: 'Sage Green', hex: '#7E8B7C' }
    ],
    sizes: ['One Size'],
    inStock: true,
  },
  {
    id: 'prod-2',
    name: 'White Platform Minimalist Sneakers',
    category: 'Shoes',
    price: 1299000,
    originalPrice: 1499000,
    rating: 4.95,
    reviewsCount: 210,
    image: catShoesImg,
    isNew: true,
    isPromo: true,
    description: 'Sepatu sneakers kulit vegan putih bersih dengan insole Memory Foam. Desain platform ringan inspired by Nike & Apple minimalist aesthetic.',
    specs: [
      'Upper: Premium Vegan Microfiber Leather',
      'Sole: Lightweight Recycled Rubber (3.5cm height)',
      'Insole: Breathable Eco Memory Foam'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Off-White Cream', hex: '#F5F2EB' }
    ],
    sizes: ['38', '39', '40', '41', '42', '43'],
    inStock: true,
  },
  {
    id: 'prod-3',
    name: 'Organic Cotton Studio Knit Sweater',
    category: 'Fashion',
    price: 649000,
    originalPrice: 799000,
    rating: 4.85,
    reviewsCount: 94,
    image: catFashionImg,
    isNew: true,
    isPromo: false,
    description: 'Sweater rajut rajutan halus berbahan 100% kapas organik bersertifikat GOTS. Siluet rileks dengan jahitan bahu terkulai modern.',
    specs: [
      '100% Certified Organic Cotton',
      'Breathable, Hypoallergenic',
      'Relaxed Tailored Fit'
    ],
    colors: [
      { name: 'Warm Cream', hex: '#F0ECE1' },
      { name: 'Muted Brown', hex: '#8C7A6B' },
      { name: 'Soft Sage', hex: '#9AA398' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 'prod-4',
    name: 'Chronograph Minimalist Silver Watch',
    category: 'Accessories',
    price: 1899000,
    originalPrice: 2299000,
    rating: 4.9,
    reviewsCount: 76,
    image: catAccessoriesImg,
    isNew: false,
    isPromo: true,
    description: 'Jam tangan analog baja tahan karat dengan kaca Sapphire Crystal anti gores dan tali kulit nabati Italia.',
    specs: [
      'Case Diameter: 40mm Stainless Steel 316L',
      'Movement: Japanese Quartz Precision Movement',
      'Water Resistance: 5 ATM (50 Meter)'
    ],
    colors: [
      { name: 'Brushed Silver', hex: '#D8D8D8' },
      { name: 'Matte Obsidian', hex: '#2B2B2B' }
    ],
    sizes: ['Standard 20mm Strap'],
    inStock: true,
  },
  {
    id: 'prod-5',
    name: 'Minimalist Structured Leather Tote',
    category: 'Bags',
    price: 1149000,
    originalPrice: 1399000,
    rating: 4.88,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    isPromo: false,
    description: 'Tas tote kulit nabati dengan potongan sudut tajam dan struktur kokoh. Muat laptop 14 inci dan pernak-pernik harian.',
    specs: [
      '100% Eco-Tanned Vegetable Leather',
      'Magnetic Closure with Hidden Pocket',
      'Dimensions: 38cm x 30cm x 12cm'
    ],
    colors: [
      { name: 'Cognac Tan', hex: '#9E5B32' },
      { name: 'Jet Black', hex: '#181818' }
    ],
    sizes: ['Medium Tote'],
    inStock: true,
  },
  {
    id: 'prod-6',
    name: 'Aesthetic Linen Button-Down Shirt',
    category: 'Fashion',
    price: 499000,
    originalPrice: 599000,
    rating: 4.79,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    isNew: false,
    isPromo: true,
    description: 'Kemeja linen murni dengan daya serap tinggi dan sensasi adem alami. Sempurna untuk tampilan kasual maupun semi-formal.',
    specs: [
      '100% French Flax Linen',
      'Pre-washed for Ultra Soft Feeling',
      'Natural Wood Shell Buttons'
    ],
    colors: [
      { name: 'Natural White', hex: '#FBFBFA' },
      { name: 'Sky Slate', hex: '#A8B9C7' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 'prod-7',
    name: 'Urban Runner Eco Slip-On Shoes',
    category: 'Shoes',
    price: 999000,
    originalPrice: 1199000,
    rating: 4.82,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    isNew: false,
    isPromo: false,
    description: 'Sepatu lari kasual berdesain slip-on fleksibel berbahan benang rajut daur ulang. Ringan seperti tanpa alas kaki.',
    specs: [
      'Flyknit Recycled Upper',
      'Ultra-bounce Cushioning',
      'Weight: 210g'
    ],
    colors: [
      { name: 'Cloud Gray', hex: '#C5C7CA' },
      { name: 'All Black', hex: '#111111' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    inStock: true,
  },
  {
    id: 'prod-8',
    name: 'Titanium Polarized Sunglasses',
    category: 'Accessories',
    price: 799000,
    originalPrice: 999000,
    rating: 4.92,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    isPromo: true,
    description: 'Kacamata hitam berbingkai titanium超ringan dengan lensa polarized UV400 anti silau. Sangat nyaman dipakai seharian.',
    specs: [
      'Ultralight Japanese Titanium Frame (12g)',
      'UV400 TAC Polarized Lenses',
      'Anti-Scratch Hydrophobic Coating'
    ],
    colors: [
      { name: 'Gunmetal Silver', hex: '#4A4E51' },
      { name: 'Champagne Gold', hex: '#D4C19C' }
    ],
    sizes: ['Universal Fit'],
    inStock: true,
  },
  {
    id: 'prod-9',
    name: 'Heavyweight Oversized Organic Hoodie',
    category: 'Fashion',
    price: 749000,
    originalPrice: 899000,
    rating: 4.91,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    isPromo: true,
    description: 'Hoodie berbahan katun organik tebal 450 GSM dengan potongan boxy oversized. Nyaman, hangat, dan tahan lama.',
    specs: [
      '450 GSM Heavyweight Organic French Terry',
      'Double-lined Hood with Metal Tips',
      'Kangaroo Front Pocket'
    ],
    colors: [
      { name: 'Oatmeal Beige', hex: '#E6E2DD' },
      { name: 'Dark Moss', hex: '#3B4837' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 'prod-10',
    name: 'Smart Active Fitness Watch',
    category: 'Accessories',
    price: 2299000,
    originalPrice: 2699000,
    rating: 4.89,
    reviewsCount: 87,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    isPromo: false,
    description: 'Smartwatch olahraga presisi tinggi dengan pelacak detak jantung, SpO2, dan ketahanan air hingga 50m.',
    specs: [
      'AMOLED Always-On Display 1.4"',
      'SpO2 & Heart Rate Monitoring',
      'Daya Tahan Baterai Hingga 10 Hari'
    ],
    colors: [
      { name: 'Matte Black', hex: '#1C1C1C' },
      { name: 'Silver Aluminum', hex: '#D1D5DB' }
    ],
    sizes: ['Standard 22mm Strap'],
    inStock: true,
  },
  {
    id: 'prod-11',
    name: 'Crossbody Sling Modular Bag',
    category: 'Bags',
    price: 599000,
    originalPrice: 749000,
    rating: 4.87,
    reviewsCount: 93,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    isNew: false,
    isPromo: true,
    description: 'Tas selempang praktis modular berbahan Cordura tahan air. Dilengkapi sistem pengunci magnetik Fidlock cepat.',
    specs: [
      'Cordura 500D Weatherproof',
      'Fidlock Magnetic Buckle System',
      'Multi-organizer Tech Pockets'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#111111' },
      { name: 'Olive Green', hex: '#4B5320' }
    ],
    sizes: ['One Size'],
    inStock: true,
  },
  {
    id: 'prod-12',
    name: 'Minimalist Leather Loafers',
    category: 'Shoes',
    price: 1499000,
    originalPrice: 1799000,
    rating: 4.93,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    isPromo: false,
    description: 'Sepatu loafer kulit asli dengan desain slip-on elegan dan insole empuk. Cocok untuk acara formal maupun santai.',
    specs: [
      'Full Grain Calfskin Leather',
      'Cushioned Leather Insole',
      'Durable Rubber Outsole'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#3D2314' },
      { name: 'Classic Black', hex: '#111111' }
    ],
    sizes: ['39', '40', '41', '42', '43'],
    inStock: true,
  },
];
