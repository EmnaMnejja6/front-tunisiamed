import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clinic-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinic-list.component.html',
  styleUrl: './clinic-list.component.css'
})
export class ClinicListComponent implements OnInit {
  clinics: any[] = [];
  filteredClinics: any[] = [];
  isLoading = true;
  showModal = false;
  searchTerm = '';
  
  clinicForm = {
    name: '',
    description: '',
    address: '',
    city: '',
    latitude: 0,
    longitude: 0,
    phone: '',
    email: '',
    imageUrl: '',
    clinicAdminId: null
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClinics();
  }

  loadClinics(): void {
    this.isLoading = true;
    this.http.get<any[]>('http://localhost:8081/api/clinics').subscribe({
      next: (data) => {
        this.clinics = data;
        this.filteredClinics = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  filterClinics(): void {
    if (!this.searchTerm) {
      this.filteredClinics = this.clinics;
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredClinics = this.clinics.filter(clinic =>
      clinic.name.toLowerCase().includes(term) ||
      clinic.city.toLowerCase().includes(term)
    );
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.clinicForm = {
      name: '',
      description: '',
      address: '',
      city: '',
      latitude: 0,
      longitude: 0,
      phone: '',
      email: '',
      imageUrl: '',
      clinicAdminId: null
    };
  }

  createClinic(): void {
    console.log('Creating clinic:', this.clinicForm);
    
    if (!this.clinicForm.name || !this.clinicForm.city) {
      alert('Please fill in at least the name and city');
      return;
    }

    this.http.post('http://localhost:8081/api/clinics', this.clinicForm).subscribe({
      next: (response) => {
        console.log('Clinic created:', response);
        this.loadClinics();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error creating clinic:', error);
        alert('Failed to create clinic: ' + (error.error?.message || error.message));
      }
    });
  }

  deleteClinic(id: number): void {
    if (confirm('Are you sure you want to delete this clinic?')) {
      this.http.delete(`http://localhost:8081/api/clinics/${id}`).subscribe({
        next: () => {
          this.loadClinics();
        }
      });
    }
  }
}
