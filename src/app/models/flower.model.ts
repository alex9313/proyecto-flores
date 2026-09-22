export interface Flower {
  id: number;
  name: string;
  category: 'Rosas' | 'Girasoles' | 'Orquideas' | 'Bouquets' | 'Plantas' | 'Especiales';
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
  ribbon?: string;
  tags: string[];
}

export interface CartItem {
  flower: Flower;
  quantity: number;
}

export interface CategoryOption {
  id: string;
  name: string;
  icon: string;
  count: number;
}
