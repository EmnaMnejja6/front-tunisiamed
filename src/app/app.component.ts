import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HeroComponent],
  template: `
    <app-header></app-header>
    <app-hero></app-hero>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
