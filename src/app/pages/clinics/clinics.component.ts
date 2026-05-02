import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ClinicService } from '../../services/clinic.service';
import { Clinic } from '../../models/clinic.model';

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.css'
})
export class ClinicsComponent implements OnInit {
  constructor(private router: Router, private clinicService: ClinicService) { }
  searchTerm: string = '';

  clinics: Clinic[] = [];
  loading: boolean = false;
  filteredClinics: Clinic[] = [];

  filterClinics() {
    if (!this.searchTerm.trim()) {
      this.filteredClinics = [...this.clinics];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredClinics = this.clinics.filter(clinic =>
      clinic.name.toLowerCase().includes(searchLower) ||
      clinic.city.toLowerCase().includes(searchLower) ||
      clinic.address.toLowerCase().includes(searchLower) ||
      clinic.specialties.some(s => s.label.toLowerCase().includes(searchLower))
    );
  }

  navigateToClinic(clinicId: number) {
    this.router.navigate(['/clinic', clinicId]);
  }
  ngOnInit() {
    this.loading = true;
    this.clinicService.getClinics().subscribe({
      next: (data) => {
        this.clinics = data;
        this.filteredClinics = [...data];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching clinics:', error);
        this.loading = false;
      }
    });
  }

}