import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { ClinicService } from '../../services/clinic.service';
import { SpecialtyService } from '../../services/specialty.service';
import { Clinic } from '../../models/clinic.model';
import { Specialty } from '../../models/specialty.model';

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.css'
})
export class ClinicsComponent implements OnInit {
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private specialtyService: SpecialtyService
  ) { }
  searchTerm: string = '';
  selectedSpecialty: string = '';
  specialties: Specialty[] = [];
  isSpecialtyDropdownOpen: boolean = false;

  clinics: Clinic[] = [];
  loading: boolean = false;
  filteredClinics: Clinic[] = [];

  filterClinics() {
    let result = [...this.clinics];

    // Filter by specialty if selected
    if (this.selectedSpecialty) {
      result = result.filter(clinic =>
        clinic.specialties.some(s => 
          s.label.toLowerCase() === this.selectedSpecialty.toLowerCase()
        )
      );
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      result = result.filter(clinic =>
        clinic.name.toLowerCase().includes(searchLower) ||
        clinic.city.toLowerCase().includes(searchLower) ||
        clinic.address.toLowerCase().includes(searchLower) ||
        clinic.specialties.some(s => s.label.toLowerCase().includes(searchLower))
      );
    }

    this.filteredClinics = result;
  }

  navigateToClinic(clinicId: number) {
    this.router.navigate(['/clinic', clinicId]);
  }
  ngOnInit() {
    this.loading = true;
    
    // Load specialties
    this.specialtyService.getSpecialties().subscribe({
      next: (specialties) => {
        this.specialties = specialties;
      },
      error: (error) => {
        console.error('Error fetching specialties:', error);
      }
    });
    
    // Get specialty from query params
    this.route.queryParams.subscribe(params => {
      this.selectedSpecialty = params['specialty'] || '';
      
      // Load clinics
      this.clinicService.getClinics().subscribe({
        next: (data) => {
          this.clinics = data;
          this.filterClinics();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching clinics:', error);
          this.loading = false;
        }
      });
    });
  }

  clearSpecialtyFilter() {
    this.selectedSpecialty = '';
    this.router.navigate(['/clinics'], { queryParams: {} });
    this.filterClinics();
  }

  toggleSpecialtyDropdown() {
    this.isSpecialtyDropdownOpen = !this.isSpecialtyDropdownOpen;
  }

  selectSpecialty(specialty: Specialty) {
    this.selectedSpecialty = specialty.label;
    this.isSpecialtyDropdownOpen = false;
    this.router.navigate(['/clinics'], { 
      queryParams: { specialty: specialty.label } 
    });
    this.filterClinics();
  }

  clearAllFilters() {
    this.selectedSpecialty = '';
    this.searchTerm = '';
    this.router.navigate(['/clinics'], { queryParams: {} });
    this.filterClinics();
  }

}