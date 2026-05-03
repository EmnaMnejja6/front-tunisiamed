import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ClinicService } from '../../../services/clinic.service';
import { DoctorService } from '../../../services/doctor.service';
import { QuoteResponseService } from '../../../services/quote-response.service';
import { Clinic } from '../../../models/clinic.model';
import { Doctor } from '../../../models/doctor.model';

@Component({
  selector: 'app-clinic-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class ClinicAdminDashboardComponent implements OnInit {
  clinic: Clinic | null = null;
  doctors: Doctor[] = [];
  pendingQuotes: number = 0;
  respondedQuotes: number = 0;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private clinicService: ClinicService,
    private doctorService: DoctorService,
    private quoteResponseService: QuoteResponseService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    const user = this.authService.getUser();
    if (!user) return;

    this.clinicService.getClinicsByAdmin(user.id).subscribe({
      next: (clinics) => {
        if (clinics.length > 0) {
          this.clinic = clinics[0];
          this.loadDoctors();
          this.loadQuoteStats();
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadDoctors() {
    if (!this.clinic) return;
    
    this.doctorService.getDoctors(this.clinic.id).subscribe({
      next: (doctors) => {
        this.doctors = doctors;
      }
    });
  }

  loadQuoteStats() {
    if (!this.clinic) return;

    this.quoteResponseService.getResponsesByClinic(this.clinic.id).subscribe({
      next: (responses) => {
        this.respondedQuotes = responses.length;
      }
    });
  }
}
