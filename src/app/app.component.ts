import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { StatsComponent } from './components/stats/stats.component';
import { SpecialtiesComponent } from './components/specialties/specialties.component';
import { CtaComponent } from './components/cta/cta.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HeroComponent, SearchBarComponent, StatsComponent, SpecialtiesComponent, CtaComponent],
  template: `
    <app-header></app-header>
    <app-hero></app-hero>
    <app-search-bar></app-search-bar>
    <app-stats></app-stats>
    <app-specialties></app-specialties>
    <app-cta></app-cta>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
