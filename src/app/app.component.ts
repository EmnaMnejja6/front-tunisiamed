import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  template: `
    <app-header *ngIf="showHeaderFooter"></app-header>
    <router-outlet></router-outlet>
    <app-footer *ngIf="showHeaderFooter"></app-footer>
  `
})
export class AppComponent {
  showHeaderFooter = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.url;
        this.showHeaderFooter = !url.startsWith('/admin') && !url.startsWith('/clinic-admin');
      });
  }
}
