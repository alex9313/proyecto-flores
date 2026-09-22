import { Component, ElementRef, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface TimelineChapter {
  id: number;
  badge: string;
  title: string;
  message: string;
  handwrittenNote: string;
  petalsColor: string;
  bloomed: boolean;
}

@Component({
  selector: 'app-sunflower-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sunflower-timeline.html',
  styleUrl: './sunflower-timeline.css'
})
export class SunflowerTimelineComponent implements OnInit {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly chapters = signal<TimelineChapter[]>([
    {
      id: 1,
      badge: 'Razón 1 • La Luz',
      title: 'Tu sonrisa ilumina cualquier rincón',
      message: 'Igual que los girasoles giran buscando incansablemente los rayos dorados del sol, mi corazón siempre encuentra su dirección y su refugio en tu calidez y alegría.',
      handwrittenNote: 'Gracias por ser la luz que transforma mis días.',
      petalsColor: '#fbbf24',
      bloomed: false
    },
    {
      id: 2,
      badge: 'Razón 2 • Fuerza & Ternura',
      title: 'Tu forma única de abrazar la vida',
      message: 'Un girasol se mantiene erguido y majestuoso incluso ante la tormenta más fuerte. Admiro tu fortaleza, tu dulzura y la pasión con la que cuidas a los que amas.',
      handwrittenNote: 'Eres más fuerte y maravillosa de lo que imaginas.',
      petalsColor: '#f59e0b',
      bloomed: false
    },
    {
      id: 3,
      badge: 'Razón 3 • Crecimiento',
      title: 'Cada recuerdo contigo florece para siempre',
      message: 'Los momentos más simples a tu lado se vuelven memorias doradas: cada risa compartida, cada charla y cada mirada cómplice que el tiempo jamás podrá borrar.',
      handwrittenNote: 'Los mejores capítulos de mi vida llevan tu nombre.',
      petalsColor: '#fde047',
      bloomed: false
    },
    {
      id: 4,
      badge: 'Razón 4 • Incondicional',
      title: 'Un amor que no conoce estaciones',
      message: 'Las flores de este jardín digital no se marchitan jamás, al igual que el amor inmenso y el lugar tan especial que ocupas en mi corazón.',
      handwrittenNote: 'Siempre estaré para ti, hoy, mañana y siempre.',
      petalsColor: '#f59e0b',
      bloomed: false
    }
  ]);

  readonly petalAngles = Array.from({ length: 12 }, (_, i) => i * 30);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollObserver();
    }
  }

  private setupScrollObserver() {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = Number(entry.target.getAttribute('data-chapter-id'));
              this.setChapterBloomed(id);
            }
          });
        },
        { threshold: 0.25 }
      );

      const items = this.el.nativeElement.querySelectorAll('.timeline-item');
      items.forEach((item: Element) => observer.observe(item));
    }, 100);
  }

  private setChapterBloomed(id: number) {
    this.chapters.update((list) =>
      list.map((ch) => (ch.id === id ? { ...ch, bloomed: true } : ch))
    );
  }
}
