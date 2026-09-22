import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowerService } from '../../services/flower.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  readonly flowerService = inject(FlowerService);
  isMobileMenuOpen = false;
  searchInput = '';

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onSearchChange() {
    this.flowerService.setSearchQuery(this.searchInput);
  }

  scrollToSection(sectionId: string) {
    this.isMobileMenuOpen = false;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
