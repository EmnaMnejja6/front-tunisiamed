import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ClinicService } from '../../../services/clinic.service';

interface DashboardStats {
  totalClinics: number;
  totalQuotes: number;
  totalClinicAdmins: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalClinics: 0,
    totalQuotes: 0,
    totalClinicAdmins: 0
  };
  recentClinics: any[] = [];
  recentQuotes: any[] = [];
  isLoading = true;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private clinicService: ClinicService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load clinics
    this.clinicService.getClinics().subscribe({
      next: (clinics) => {
        console.log('Clinics loaded:', clinics);
        this.stats.totalClinics = Array.isArray(clinics) ? clinics.length : 0;
        this.recentClinics = Array.isArray(clinics) ? clinics.slice(0, 3) : [];
      },
      error: (error) => {
        console.error('Error loading clinics:', error);
        this.stats.totalClinics = 0;
        this.recentClinics = [];
      }
    });

    // Load quotes
    this.http.get<any[]>('https://back-tunisiamed.onrender.com/api/quote-requests').subscribe({
      next: (quotes) => {
        console.log('Quotes loaded:', quotes);
        this.stats.totalQuotes = Array.isArray(quotes) ? quotes.length : 0;
        this.recentQuotes = Array.isArray(quotes) ? quotes.slice(0, 5) : [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading quotes:', error);
        this.stats.totalQuotes = 0;
        this.recentQuotes = [];
        this.isLoading = false;
      }
    });

    // Load clinic admins
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log('Users loaded:', users);
        const clinicAdmins = Array.isArray(users) ? users.filter(u => u.role === 'CLINIC_ADMIN') : [];
        this.stats.totalClinicAdmins = clinicAdmins.length;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.stats.totalClinicAdmins = 0;
      }
    });
  }
}
