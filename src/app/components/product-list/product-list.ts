import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowerService } from '../../services/flower.service';
import { Flower } from '../../models/flower.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {
  readonly flowerService = inject(FlowerService);

  onCategorySelect(categoryId: string) {
    this.flowerService.setCategory(categoryId);
  }

  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.flowerService.setSortBy(target.value as 'popular' | 'price-asc' | 'price-desc');
  }

  addToCart(flower: Flower, event: MouseEvent) {
    event.stopPropagation();
    this.flowerService.addToCart(flower);
  }

  quickBuy(flower: Flower) {
    this.flowerService.addToCart(flower);
    this.flowerService.toggleCart(true);
  }
}
