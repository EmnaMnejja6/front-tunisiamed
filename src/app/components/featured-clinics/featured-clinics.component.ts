import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClinicService } from '../../services/clinic.service';
import { Clinic } from '../../models/clinic.model';

@Component({
  selector: 'app-featured-clinics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-clinics.component.html',
  styleUrl: './featured-clinics.component.css'
})
export class FeaturedClinicsComponent implements OnInit {
  clinics: Clinic[] = [];

  constructor(
    private clinicService: ClinicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedClinics();
  }

  loadFeaturedClinics(): void {
    this.clinicService.getClinics().subscribe({
      next: (data) => {
        // Sort by rating (highest first) and take top 3
        this.clinics = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
      },
      error: (error) => {
        console.error('Error loading featured clinics:', error);
      }
    });
  }

  navigateToClinic(clinicId: number): void {
    this.router.navigate(['/clinic', clinicId]);
  }

  navigateToAllClinics(): void {
    this.router.navigate(['/clinics']);
  }
}
