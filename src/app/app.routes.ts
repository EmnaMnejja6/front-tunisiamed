import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClinicsComponent } from './pages/clinics/clinics.component';
import { SpecialtiesComponent } from './pages/specialties/specialties.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clinics', component: ClinicsComponent },
  { path: 'specialties', component: SpecialtiesComponent},
  { path: '**', redirectTo: '' },
];