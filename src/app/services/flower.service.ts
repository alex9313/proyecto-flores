import { Injectable, computed, signal } from '@angular/core';
import { CartItem, CategoryOption, Flower } from '../models/flower.model';

@Injectable({
  providedIn: 'root',
})
export class FlowerService {
  // Flower Catalog Data with curated high quality imagery
  private readonly flowersData = signal<Flower[]>([
    {
      id: 1,
      name: 'Ramo Sublime de Rosas Rojas',
      category: 'Rosas',
      price: 185.0,
      originalPrice: 220.0,
      description: '24 rosas rojas premium de tallo largo con follaje de eucalipto envoltura de lujo.',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewsCount: 128,
      inStock: true,
      featured: true,
      ribbon: 'Más Vendido',
      tags: ['Amor', 'Aniversario', 'Romántico'],
    },
    {
      id: 2,
      name: 'Destello de Girasoles & Lirios',
      category: 'Girasoles',
      price: 145.0,
      description: 'Girasoles radiantes combinados con lirios blancos, hortensias y follaje fresco de temporada.',
      image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewsCount: 94,
      inStock: true,
      featured: true,
      ribbon: 'Favorito',
      tags: ['Cumpleaños', 'Alegría', 'Agradecimiento'],
    },
    {
      id: 3,
      name: 'Orquídea Phalaenopsis Blanca Imperial',
      category: 'Orquideas',
      price: 210.0,
      originalPrice: 240.0,
      description: 'Doble vara de orquídea blanca en maceta de cerámica esmaltada artesanal.',
      image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviewsCount: 76,
      inStock: true,
      featured: true,
      ribbon: 'Elegancia',
      tags: ['Decoración', 'Corporativo', 'Lujo'],
    },
    {
      id: 4,
      name: 'Bouquet Pastel Pastel Romance',
      category: 'Bouquets',
      price: 160.0,
      description: 'Mezcla delicada de peonías, rosas color durazno, claveles y flores silvestres.',
      image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewsCount: 110,
      inStock: true,
      featured: false,
      tags: ['Romance', 'Boda', 'Especial'],
    },
    {
      id: 5,
      name: 'Arreglo Silvestre & Lavanda Provenzal',
      category: 'Bouquets',
      price: 130.0,
      description: 'Bouquet rústico y aromático con toques de lavanda, eucalipto y margaritas blancas.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviewsCount: 52,
      inStock: true,
      featured: false,
      tags: ['Relax', 'Hogar', 'Detalle'],
    },
    {
      id: 6,
      name: 'Caja Floral Exclusiva Velvet Rose',
      category: 'Especiales',
      price: 260.0,
      originalPrice: 299.0,
      description: 'Elegante sombrero/caja aterciopelada con 36 rosas seleccionadas y bombones artesanales.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviewsCount: 143,
      inStock: true,
      featured: true,
      ribbon: 'Edición VIP',
      tags: ['Lujo', 'San Valentín', 'Regalo Premium'],
    },
    {
      id: 7,
      name: 'Monstera Deliciosa & Maceta Terracota',
      category: 'Plantas',
      price: 115.0,
      description: 'Planta de interior purificadora, follaje exuberante y fácil cuidado con guía de riego.',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewsCount: 41,
      inStock: true,
      featured: false,
      tags: ['Plantas', 'Interior', 'Vida'],
    },
    {
      id: 8,
      name: 'Tulipanes Holandeses Multicolor',
      category: 'Bouquets',
      price: 175.0,
      description: '20 tulipanes holandeses frescos en armonía de colores vivos y envoltorio kraft ecológico.',
      image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewsCount: 88,
      inStock: true,
      featured: false,
      ribbon: 'Temporada',
      tags: ['Primavera', 'Alegría', 'Color'],
    },
  ]);

  // Categories definition
  readonly categories: CategoryOption[] = [
    { id: 'all', name: 'Todas', icon: '🌸', count: 8 },
    { id: 'Rosas', name: 'Rosas', icon: '🌹', count: 2 },
    { id: 'Girasoles', name: 'Girasoles', icon: '🌻', count: 1 },
    { id: 'Orquideas', name: 'Orquídeas', icon: '🌺', count: 1 },
    { id: 'Bouquets', name: 'Bouquets', icon: '💐', count: 3 },
    { id: 'Plantas', name: 'Plantas', icon: '🌿', count: 1 },
    { id: 'Especiales', name: 'Especiales', icon: '✨', count: 1 },
  ];

  // Filters State
  readonly selectedCategory = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly sortBy = signal<'popular' | 'price-asc' | 'price-desc'>('popular');

  // Filtered flowers list
  readonly filteredFlowers = computed(() => {
    const list = this.flowersData();
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    const sort = this.sortBy();

    let result = list.filter((item) => {
      const matchCategory = cat === 'all' || item.category === cat;
      const matchQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));
      return matchCategory && matchQuery;
    });

    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  });

  // Shopping Cart state
  readonly cart = signal<CartItem[]>([]);
  readonly isCartOpen = signal<boolean>(false);
  readonly toastMessage = signal<string | null>(null);

  readonly totalCartItems = computed(() =>
    this.cart().reduce((acc, item) => acc + item.quantity, 0)
  );

  readonly totalCartPrice = computed(() =>
    this.cart().reduce((acc, item) => acc + item.flower.price * item.quantity, 0)
  );

  // Cart actions
  addToCart(flower: Flower, quantity = 1) {
    const current = [...this.cart()];
    const index = current.findIndex((item) => item.flower.id === flower.id);

    if (index > -1) {
      current[index] = {
        ...current[index],
        quantity: current[index].quantity + quantity,
      };
    } else {
      current.push({ flower, quantity });
    }

    this.cart.set(current);
    this.showToast(`¡"${flower.name}" agregado al carrito! 💐`);
  }

  removeFromCart(flowerId: number) {
    this.cart.set(this.cart().filter((item) => item.flower.id !== flowerId));
  }

  updateQuantity(flowerId: number, delta: number) {
    const current = [...this.cart()];
    const index = current.findIndex((item) => item.flower.id === flowerId);
    if (index > -1) {
      const newQty = current[index].quantity + delta;
      if (newQty <= 0) {
        this.removeFromCart(flowerId);
      } else {
        current[index] = { ...current[index], quantity: newQty };
        this.cart.set(current);
      }
    }
  }

  clearCart() {
    this.cart.set([]);
  }

  toggleCart(open?: boolean) {
    if (open !== undefined) {
      this.isCartOpen.set(open);
    } else {
      this.isCartOpen.update((val) => !val);
    }
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  setSortBy(sort: 'popular' | 'price-asc' | 'price-desc') {
    this.sortBy.set(sort);
  }

  showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => {
      if (this.toastMessage() === message) {
        this.toastMessage.set(null);
      }
    }, 3000);
  }
}
