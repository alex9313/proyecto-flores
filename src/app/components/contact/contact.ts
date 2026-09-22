import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlowerService } from '../../services/flower.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  readonly flowerService = inject(FlowerService);
  
  formData = {
    name: '',
    phone: '',
    occasion: 'Cumpleaños',
    message: ''
  };

  newsletterEmail = '';
  isSubmitted = false;

  onSubmit() {
    if (!this.formData.name || !this.formData.phone) {
      this.flowerService.showToast('Por favor completa tu nombre y teléfono ⚠️');
      return;
    }
    this.isSubmitted = true;
    this.flowerService.showToast('¡Mensaje enviado! Te escribiremos en minutos ✨');
  }

  onSubscribeNewsletter() {
    if (!this.newsletterEmail) return;
    this.flowerService.showToast('¡Gracias por suscribirte al Club BellaRosa! 🌹');
    this.newsletterEmail = '';
  }
}
