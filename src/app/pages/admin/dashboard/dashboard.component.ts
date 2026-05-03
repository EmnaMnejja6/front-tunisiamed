import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface DashboardStats {
  totalClinics: number;
  totalQuotes: number;
  activeCities: number;
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
    activeCities: 0
  };
  recentClinics: any[] = [];
  recentQuotes: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.http.get<any[]>('https://back-tunisiamed.onrender.com/api/clinics').subscribe({
      next: (clinics) => {
        this.stats.totalClinics = clinics.length;
        this.stats.activeCities = new Set(clinics.map(c => c.city)).size;
        this.recentClinics = clinics.slice(0, 3);
      }
    });

    this.http.get<any[]>('https://back-tunisiamed.onrender.com/api/quote-requests').subscribe({
      next: (quotes) => {
        this.stats.totalQuotes = quotes.length;
        this.recentQuotes = quotes.slice(0, 5);
        this.isLoading = false;
      }
    });
  }
}
