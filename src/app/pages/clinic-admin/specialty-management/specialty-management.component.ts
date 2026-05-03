import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ClinicService } from '../../../services/clinic.service';
import { SpecialtyService } from '../../../services/specialty.service';
import { Clinic } from '../../../models/clinic.model';
import { Specialty } from '../../../models/specialty.model';

@Component({
  selector: 'app-specialty-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialty-management.component.html',
  styleUrl: './specialty-management.component.css'
})
export class SpecialtyManagementComponent implements OnInit {
  clinic: Clinic | null = null;
  allSpecialties: Specialty[] = [];
  clinicSpecialties: Specialty[] = [];
  availableSpecialties: Specialty[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private clinicService: ClinicService,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const user = this.authService.getUser();
    if (!user) return;

    this.clinicService.getClinicsByAdmin(user.id).subscribe({
      next: (clinics) => {
        if (clinics.length > 0) {
          this.clinic = clinics[0];
          this.clinicSpecialties = this.clinic.specialties || [];
          this.loadAllSpecialties();
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadAllSpecialties() {
    this.specialtyService.getSpecialties().subscribe({
      next: (specialties) => {
        this.allSpecialties = specialties;
        this.updateAvailableSpecialties();
      }
    });
  }

  updateAvailableSpecialties() {
    const clinicSpecialtyIds = this.clinicSpecialties.map(s => s.id);
    this.availableSpecialties = this.allSpecialties.filter(
      s => !clinicSpecialtyIds.includes(s.id)
    );
  }

  addSpecialty(specialtyId: number) {
    if (!this.clinic) return;

    this.clinicService.addSpecialtyToClinic(this.clinic.id, specialtyId).subscribe({
      next: (updatedClinic) => {
        this.clinic = updatedClinic;
        this.clinicSpecialties = updatedClinic.specialties || [];
        this.updateAvailableSpecialties();
      },
      error: (err) => {
        console.error('Error adding specialty:', err);
        alert('Failed to add specialty');
      }
    });
  }

  removeSpecialty(specialtyId: number) {
    if (!this.clinic) return;
    if (!confirm('Are you sure you want to remove this specialty from your clinic?')) return;

    this.clinicService.removeSpecialtyFromClinic(this.clinic.id, specialtyId).subscribe({
      next: () => {
        this.clinicSpecialties = this.clinicSpecialties.filter(s => s.id !== specialtyId);
        this.updateAvailableSpecialties();
      },
      error: (err) => {
        console.error('Error removing specialty:', err);
        alert('Failed to remove specialty');
      }
    });
  }
}
