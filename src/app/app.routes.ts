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
import { ClinicAdminListComponent } from './pages/admin/clinic-admin-list/clinic-admin-list.component';
import { ClinicAdminLoginComponent } from './pages/clinic-admin/login/login.component';
import { ClinicAdminLayoutComponent } from './pages/clinic-admin/layout/layout.component';
import { ClinicAdminDashboardComponent } from './pages/clinic-admin/dashboard/dashboard.component';
import { DoctorListComponent } from './pages/clinic-admin/doctor-list/doctor-list.component';
import { SpecialtyManagementComponent } from './pages/clinic-admin/specialty-management/specialty-management.component';
import { QuoteRequestsComponent } from './pages/clinic-admin/quote-requests/quote-requests.component';
import { authGuard } from './guards/auth.guard';
import { ViewOffersComponent } from './pages/view-offers/view-offers.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clinics', component: ClinicsComponent },
  { path: 'specialties', component: SpecialtiesComponent},
  { path: 'request-quote', component: RequestQuoteComponent },
  { path: 'clinic/:id', component: ClinicDetailComponent },
  { path: 'view-offers', component: ViewOffersComponent },

  
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
      { path: 'specialties', component: SpecialtyListComponent },
      { path: 'clinic-admins', component: ClinicAdminListComponent }
    ]
  },

  // Clinic Admin routes
  { path: 'clinic-admin/login', component: ClinicAdminLoginComponent },
  {
    path: 'clinic-admin',
    component: ClinicAdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: ClinicAdminDashboardComponent },
      { path: 'doctors', component: DoctorListComponent },
      { path: 'specialties', component: SpecialtyManagementComponent },
      { path: 'quote-requests', component: QuoteRequestsComponent }
    ]
  },
  
  { path: '**', redirectTo: '' },
];