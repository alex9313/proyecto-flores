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
  readonly recipientName = 'Mi Persona Especial';
  readonly letterMessage = `Si tuviera que elegir un solo instante para revivir eternamente, elegiría cualquier momento a tu lado. 

Gracias por iluminar mis días con tu risa, por tu bondad sincera y por ser mi motivo favorito para sonreír. Que este campo de girasoles te recuerde siempre lo infinita, especial y hermosa que es tu luz en mi vida.`;
  readonly signature = 'Con todo mi cariño';

  openLetter() {
    this.isOpen.set(true);
  }

  closeLetter(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen.set(false);
  }
}
