import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HeroComponent, SearchBarComponent],
  template: `
    <app-header></app-header>
    <app-hero></app-hero>
    <app-search-bar></app-search-bar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
