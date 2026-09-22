import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PlantedFlower {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  message: string;
}

@Component({
  selector: 'app-sunflower-interactive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sunflower-interactive.html',
  styleUrl: './sunflower-interactive.css'
})
export class SunflowerInteractiveComponent {
  @ViewChild('gardenCanvas', { static: true }) gardenAreaRef!: ElementRef<HTMLDivElement>;

  readonly plantedFlowers = signal<PlantedFlower[]>([]);
  readonly totalPlanted = signal<number>(0);

  private readonly sweetNotes = [
    '✨ Eres mágica',
    '🌻 Iluminas todo a tu alrededor',
    '💛 Mi persona favorita',
    '🌸 Tu risa es mi canción preferida',
    '🌟 Siempre en mi mente y corazón',
    '💖 Gracias por ser tú',
    '🌿 Contigo todo florece mejor',
    '☀️ Eres mi rayito de sol',
    '✨ Eres inolvidable',
    '💫 Cada momento contigo vale oro'
  ];

  onGardenClick(event: MouseEvent) {
    const rect = this.gardenAreaRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.spawnFlower(x, y);
  }

  spawnFlower(x: number, y: number) {
    const note = this.sweetNotes[Math.floor(Math.random() * this.sweetNotes.length)];
    const newFlower: PlantedFlower = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: 45 + Math.random() * 30,
      rotation: (Math.random() - 0.5) * 40,
      message: note
    };

    this.plantedFlowers.update((list) => [...list, newFlower]);
    this.totalPlanted.update((val) => val + 1);
  }

  bloomBouquetExplosion() {
    const rect = this.gardenAreaRef.nativeElement.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const x = 50 + Math.random() * (rect.width - 100);
        const y = 50 + Math.random() * (rect.height - 100);
        this.spawnFlower(x, y);
      }, i * 140);
    }
  }

  clearGarden() {
    this.plantedFlowers.set([]);
  }
}
