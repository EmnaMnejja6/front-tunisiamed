import { Component } from '@angular/core';
import { FeaturedClinicsComponent } from '../../components/featured-clinics/featured-clinics.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { FeaturedSpecialtiesComponent } from '../../components/featured-specialties/featured-specialties.component';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { StatsComponent } from '../../components/stats/stats.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FeaturedClinicsComponent, 
    CtaComponent, 
    FeaturedSpecialtiesComponent, 
    HeroComponent, 
    CommonModule, 
    SearchBarComponent,
    StatsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
