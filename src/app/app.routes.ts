import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClinicsComponent } from './pages/clinics/clinics.component';
import { SpecialtiesComponent } from './pages/specialties/specialties.component';
import { RequestQuoteComponent } from './pages/request-quote/request-quote.component';
import { ClinicDetailComponent } from './pages/clinic-detail/clinic-detail.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ClinicListComponent } from './pages/admin/clinic-list/clinic-list.component';
import { QuoteListComponent } from './pages/admin/quote-list/quote-list.component';
import { SpecialtyListComponent } from './pages/admin/specialty-list/specialty-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clinics', component: ClinicsComponent },
  { path: 'specialties', component: SpecialtiesComponent},
  { path: 'request-quote', component: RequestQuoteComponent },
  { path: 'clinic/:id', component: ClinicDetailComponent },
  
  // Admin routes
  { path: 'admin/login', component: LoginComponent },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'clinics', component: ClinicListComponent },
      { path: 'quotes', component: QuoteListComponent },
      { path: 'specialties', component: SpecialtyListComponent }
    ]
  },
  
  { path: '**', redirectTo: '' },
];