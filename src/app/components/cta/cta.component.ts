import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css'
})
export class CtaComponent {
  constructor(private router: Router) {}

  navigateToQuote(): void {
    this.router.navigate(['/request-quote']);
  }
}
