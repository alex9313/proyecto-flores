import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sunflower-letter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sunflower-letter.html',
  styleUrl: './sunflower-letter.css'
})
export class SunflowerLetterComponent {
  readonly isOpen = signal<boolean>(false);

  // Puedes editar directamente estos textos aquí en el código:
  readonly recipientName = 'Mi amor,';
  readonly letterMessage = `Hoy quise darte estas flores amarillas porque desde que estás en mi vida entendí de verdad lo que significa tener a alguien que ilumine todo alrededor. No se trata solo de cumplir con una fecha bonita o con una tradición; para mí es el pretexto perfecto para recordarte el lugar tan especial que ocupas en mi corazón. 

Eres esa calma que necesito en los días difíciles y la primera persona con la que quiero celebrar cualquier alegría. Me encanta la complicidad que tenemos, la forma en que nos entendemos y cómo cada momento a tu lado se siente auténtico y especial. Estas flores representan esa luz que traes a mi vida y, sobre todo, la promesa de seguir cuidando lo que tenemos, de acompañarte en cada paso y de elegirte todos los días.`;
  readonly signature = 'Con todo mi amor. Te amo mucho';

  openLetter() {
    this.isOpen.set(true);
  }

  closeLetter(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen.set(false);
  }
}
