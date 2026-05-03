import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ClinicService } from '../../../services/clinic.service';
import { DoctorService } from '../../../services/doctor.service';
import { SpecialtyService } from '../../../services/specialty.service';
import { Doctor, CreateDoctorRequest } from '../../../models/doctor.model';
import { Clinic } from '../../../models/clinic.model';
import { Specialty } from '../../../models/specialty.model';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  clinic: Clinic | null = null;
  specialties: Specialty[] = [];
  isLoading = true;
  showModal = false;
  isEditMode = false;
  editingDoctorId: number | null = null;

  doctorForm: CreateDoctorRequest = {
    firstName: '',
    lastName: '',
    photoUrl: '',
    experienceYears: 0,
    diploma: '',
    biography: '',
    clinicId: 0,
    specialtyId: 0
  };

  constructor(
    private authService: AuthService,
    private clinicService: ClinicService,
    private doctorService: DoctorService,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit() {
    this.loadClinicAndDoctors();
    this.loadSpecialties();
  }

  loadClinicAndDoctors() {
    const user = this.authService.getUser();
    if (!user) return;

    this.clinicService.getClinicsByAdmin(user.id).subscribe({
      next: (clinics) => {
        if (clinics.length > 0) {
          this.clinic = clinics[0];
          this.loadDoctors();
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

  loadSpecialties() {
    this.specialtyService.getSpecialties().subscribe({
      next: (specialties) => {
        this.specialties = specialties;
      }
    });
  }

  openModal() {
    this.isEditMode = false;
    this.editingDoctorId = null;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(doctor: Doctor) {
    this.isEditMode = true;
    this.editingDoctorId = doctor.id;
    this.doctorForm = {
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      photoUrl: doctor.photoUrl || '',
      experienceYears: doctor.experienceYears,
      diploma: doctor.diploma,
      biography: doctor.biography || '',
      clinicId: doctor.clinicId,
      specialtyId: doctor.specialty?.id || 0
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.doctorForm = {
      firstName: '',
      lastName: '',
      photoUrl: '',
      experienceYears: 0,
      diploma: '',
      biography: '',
      clinicId: this.clinic?.id || 0,
      specialtyId: 0
    };
  }

  saveDoctor() {
    if (!this.clinic) return;

    this.doctorForm.clinicId = this.clinic.id;

    if (this.isEditMode && this.editingDoctorId) {
      this.doctorService.updateDoctor(this.editingDoctorId, this.doctorForm).subscribe({
        next: () => {
          this.loadDoctors();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating doctor:', err);
          alert('Failed to update doctor');
        }
      });
    } else {
      this.doctorService.createDoctor(this.doctorForm).subscribe({
        next: () => {
          this.loadDoctors();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating doctor:', err);
          alert('Failed to create doctor');
        }
      });
    }
  }

  deleteDoctor(id: number) {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    this.doctorService.deleteDoctor(id).subscribe({
      next: () => {
        this.loadDoctors();
      },
      error: (err) => {
        console.error('Error deleting doctor:', err);
        alert('Failed to delete doctor');
      }
    });
  }
}
