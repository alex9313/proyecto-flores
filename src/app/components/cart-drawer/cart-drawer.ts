import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowerService } from '../../services/flower.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css'
})
export class CartDrawerComponent {
  readonly flowerService = inject(FlowerService);
  isCheckingOut = false;
  orderCompleted = false;

  closeCart() {
    this.flowerService.toggleCart(false);
  }

  processCheckout() {
    if (this.flowerService.cart().length === 0) return;
    this.isCheckingOut = true;
    setTimeout(() => {
      this.isCheckingOut = false;
      this.orderCompleted = true;
      this.flowerService.clearCart();
    }, 1200);
  }

  resetOrder() {
    this.orderCompleted = false;
    this.closeCart();
  }
}
