import { Component } from '@angular/core';
import { FeaturedClinicsComponent } from '../../components/featured-clinics/featured-clinics.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { SpecialtiesComponent } from '../../components/specialties/specialties.component';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeaturedClinicsComponent, CtaComponent, SpecialtiesComponent, HeroComponent, CommonModule, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
