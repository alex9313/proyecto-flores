import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SunflowerCanvasComponent } from './components/sunflower-canvas/sunflower-canvas';
import { SunflowerHeroComponent } from './components/sunflower-hero/sunflower-hero';
import { SunflowerTimelineComponent } from './components/sunflower-timeline/sunflower-timeline';
import { SunflowerInteractiveComponent } from './components/sunflower-interactive/sunflower-interactive';
import { SunflowerLetterComponent } from './components/sunflower-letter/sunflower-letter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SunflowerCanvasComponent,
    SunflowerHeroComponent,
    SunflowerTimelineComponent,
    SunflowerInteractiveComponent,
    SunflowerLetterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
