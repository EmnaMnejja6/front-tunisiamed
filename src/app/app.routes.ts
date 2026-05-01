import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClinicsComponent } from './pages/clinics/clinics.component';
import { SpecialtiesComponent } from './pages/specialties/specialties.component';
import { RequestQuoteComponent } from './pages/request-quote/request-quote.component';
import { ClinicDetailComponent } from './pages/clinic-detail/clinic-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clinics', component: ClinicsComponent },
  { path: 'specialties', component: SpecialtiesComponent},
  { path: 'request-quote', component: RequestQuoteComponent },
  { path: 'clinic/:id', component: ClinicDetailComponent },
  { path: '**', redirectTo: '' },
];