import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  curve: number;
}

interface Firefly {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  alpha: number;
  targetAlpha: number;
  color: string;
}

@Component({
  selector: 'app-sunflower-canvas',
  standalone: true,
  template: `<canvas #canvas class="ambient-canvas"></canvas>`,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 1;
    }
    .ambient-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class SunflowerCanvasComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId: number | null = null;
  private petals: Petal[] = [];
  private fireflies: Firefly[] = [];
  private width = 0;
  private height = 0;
  private resizeHandler = () => this.resize();

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initCanvas();
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', this.resizeHandler);

    this.createPetals(25);
    this.createFireflies(35);

    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  private resize() {
    if (!this.canvasRef) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvasRef.nativeElement.width = this.width;
    this.canvasRef.nativeElement.height = this.height;
  }

  private createPetals(count: number) {
    const colors = ['#fbbf24', '#f59e0b', '#fde68a', '#d97706'];
    for (let i = 0; i < count; i++) {
      this.petals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: 12 + Math.random() * 16,
        speedX: 0.5 + Math.random() * 1.5,
        speedY: 0.8 + Math.random() * 1.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.4 + Math.random() * 0.5,
        curve: Math.random() * 0.5
      });
    }
  }

  private createFireflies(count: number) {
    const colors = ['#fde047', '#fef08a', '#facc15', '#ffffff'];
    for (let i = 0; i < count; i++) {
      this.fireflies.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 1 + Math.random() * 2.5,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        alpha: Math.random(),
        targetAlpha: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  private animate = () => {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw fireflies (glowing pollen/light)
    for (const f of this.fireflies) {
      f.x += f.speedX;
      f.y += f.speedY;
      if (f.x < 0) f.x = this.width;
      if (f.x > this.width) f.x = 0;
      if (f.y < 0) f.y = this.height;
      if (f.y > this.height) f.y = 0;

      f.alpha += (f.targetAlpha - f.alpha) * 0.02;
      if (Math.abs(f.alpha - f.targetAlpha) < 0.05) {
        f.targetAlpha = Math.random() * 0.9;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = f.color;
      this.ctx.globalAlpha = Math.max(0.1, f.alpha);
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#facc15';
      this.ctx.fill();
      this.ctx.restore();
    }

    // Draw falling sunflower petals
    for (const p of this.petals) {
      p.x += Math.sin(p.rotation) * 0.8 + p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y > this.height + 30) {
        p.y = -20;
        p.x = Math.random() * this.width;
      }
      if (p.x > this.width + 30) {
        p.x = -20;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = p.opacity;

      // Draw petal shape
      this.ctx.beginPath();
      this.ctx.moveTo(0, -p.size);
      this.ctx.quadraticCurveTo(p.size * 0.5, 0, 0, p.size);
      this.ctx.quadraticCurveTo(-p.size * 0.5, 0, 0, -p.size);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
      this.ctx.fill();
      this.ctx.restore();
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
