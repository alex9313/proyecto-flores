import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sunflower-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sunflower-hero.html',
  styleUrl: './sunflower-hero.css'
})
export class SunflowerHeroComponent implements OnInit {
  readonly bloomProgress = signal<number>(0);
  readonly isBlooming = signal<boolean>(false);
  readonly isMusicPlaying = signal<boolean>(false);

  private audioCtx: AudioContext | null = null;
  private musicInterval: any = null;

  // 18 petals per layer for a balanced, harmonious look
  readonly outerPetals = Array.from({ length: 18 }, (_, i) => i * 20);
  readonly innerPetals = Array.from({ length: 18 }, (_, i) => i * 20 + 10);

  ngOnInit() {
    this.startBloomSequence();
  }

  startBloomSequence() {
    this.bloomProgress.set(0);
    this.isBlooming.set(true);

    setTimeout(() => this.bloomProgress.set(1), 300);   // Stem
    setTimeout(() => this.bloomProgress.set(2), 1100);  // Leaves
    setTimeout(() => this.bloomProgress.set(3), 2000);  // Flower Head & Petals
    setTimeout(() => this.isBlooming.set(false), 3400); // Bloom complete
  }

  toggleMusic() {
    if (this.isMusicPlaying()) {
      this.stopMusic();
    } else {
      this.playHarmonicMusic();
    }
  }

  private playHarmonicMusic() {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      this.audioCtx = new AudioContextClass();
      this.isMusicPlaying.set(true);

      const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99];
      let step = 0;

      this.musicInterval = setInterval(() => {
        if (!this.audioCtx || this.audioCtx.state === 'closed') return;
        const note = notes[step % notes.length];
        this.playPluck(note);
        step++;
      }, 700);

    } catch (e) {
      console.warn('Audio Context failed to initialize', e);
    }
  }

  private playPluck(freq: number) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

    gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.6);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 1.6);
  }

  private stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.isMusicPlaying.set(false);
  }

  scrollToNext() {
    const nextSection = document.getElementById('sunflower-story');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
