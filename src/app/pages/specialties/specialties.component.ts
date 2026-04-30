import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './specialties.component.html',
  styleUrl: './specialties.component.css'
})
export class SpecialtiesComponent {
  searchTerm: string = '';

  specialties = [
    { icon: 'dental', name: 'Dental Care', clinics: 24 },
    { icon: 'eye', name: 'Ophthalmology', clinics: 18 },
    { icon: 'surgery', name: 'Cosmetic Surgery', clinics: 31 },
    { icon: 'bone', name: 'Orthopedics', clinics: 15 },
    { icon: 'heart', name: 'Cardiology', clinics: 12 },
    { icon: 'brain', name: 'Neurology', clinics: 8 },
    { icon: 'skin', name: 'Dermatology', clinics: 22 },
    { icon: 'general', name: 'General Medicine', clinics: 45 },
    { icon: 'pediatrics', name: 'Pediatrics', clinics: 16 },
    { icon: 'surgery', name: 'General Surgery', clinics: 19 }
  ];

  filteredSpecialties = [...this.specialties];

  filterSpecialties() {
    if (!this.searchTerm.trim()) {
      this.filteredSpecialties = [...this.specialties];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredSpecialties = this.specialties.filter(specialty =>
      specialty.name.toLowerCase().includes(searchLower) 
    );
  }
}
