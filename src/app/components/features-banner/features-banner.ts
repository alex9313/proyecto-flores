import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features-banner.html',
  styleUrl: './features-banner.css'
})
export class FeaturesBannerComponent {
  readonly features = [
    {
      icon: '🚚',
      title: 'Envío Mismo Día',
      description: 'Entregamos tu pedido en menos de 3 horas en toda el área metropolitana.'
    },
    {
      icon: '🌸',
      title: 'Frescura 7 Días',
      description: 'Cultivadas por floricultores locales con preservación en cadena de frío.'
    },
    {
      icon: '💌',
      title: 'Tarjeta Personalizada',
      description: 'Incluye una dedicatoria escrita a mano con caligrafía especial sin costo adicional.'
    },
    {
      icon: '🔒',
      title: 'Compra 100% Segura',
      description: 'Procesamiento protegido y garantía total de satisfacción o reemplazo.'
    }
  ];
}
