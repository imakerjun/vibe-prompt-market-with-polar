export interface ProductFeature {
  icon: 'download' | 'zap' | 'users' | 'star';
  text: string;
}

export interface Product {
  id: string;
  polarProductId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  rating?: number;
  features: ProductFeature[];
  active: boolean;
}

export interface ProductSettings {
  showInactiveProducts: boolean;
  defaultCurrency: string;
  successUrl: string;
  cancelUrl: string;
}

export interface ProductData {
  products: Product[];
  settings: ProductSettings;
}