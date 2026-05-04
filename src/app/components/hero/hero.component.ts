import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  constructor(private router: Router) {}

  navigateToQuote(): void {
    this.router.navigate(['/request-quote']);
  }

  navigateToClinics(): void {
    this.router.navigate(['/clinics']);
  }
}
