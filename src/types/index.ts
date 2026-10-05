// ============================================
// Illharlee Jewellery — Type Definitions
// ============================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: Category;
  collections: string[];
  materials: string[];
  careInstructions: string;
  variations: ProductVariation[];
  stock: number;
  lowStockThreshold: number;
  sku: string;
  isBestseller: boolean;
  isNewArrival: boolean;
  isLimited: boolean;
  isComingSoon: boolean;
  tags: string[];
  style: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariation {
  id: string;
  name: string;
  type: 'color' | 'size' | 'style';
  value: string;
  stock: number;
  priceModifier?: number;
}

export type Category =
  | 'necklaces'
  | 'earrings'
  | 'rings'
  | 'bracelets'
  | 'anklets'
  | 'jewellery-sets'
  | 'body-jewellery'
  | 'statement-pieces';

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  bannerImage: string;
  accentColor: string;
  products: string[]; // product IDs
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariation?: ProductVariation;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  customer: CustomerDetails;
  delivery: DeliveryDetails;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variation?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type OrderStatus =
  | 'pending'
  | 'payment-pending'
  | 'paid'
  | 'processing'
  | 'ready-for-dispatch'
  | 'dispatched'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PaymentMethod = 'mpesa' | 'card' | 'other';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
}

export interface DeliveryDetails {
  county: string;
  location: string;
  instructions?: string;
  isPickup: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  image?: string;
  rating: number;
  product?: string;
}

export interface ContactFormData {
  name: string;
  emailOrPhone: string;
  subject: string;
  message: string;
}

export interface NewsletterSignup {
  email: string;
  phone?: string;
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  todayOrders: number;
  todayRevenue: number;
}

export interface FilterOptions {
  category?: Category | 'all';
  collection?: string;
  priceMin?: number;
  priceMax?: number;
  availability?: 'all' | 'in-stock' | 'low-stock';
  isNewArrival?: boolean;
  isBestseller?: boolean;
  material?: string;
  style?: string;
  sort?: SortOption;
  search?: string;
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-low-high'
  | 'price-high-low'
  | 'bestselling';
