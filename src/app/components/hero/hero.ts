import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowerService } from '../../services/flower.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {
  readonly flowerService = inject(FlowerService);

  scrollToCatalog(category?: string) {
    if (category) {
      this.flowerService.setCategory(category);
    }
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
