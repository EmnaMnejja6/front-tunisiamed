import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.css'
})
export class ClinicsComponent {
  constructor(private router: Router) {}
  searchTerm: string = '';
  
  clinics = [
    {
      id: 1,
      name: 'Clinique El Manar',
      location: 'Tunis',
      specialty: 'Dental Care',
      rating: 4.8,
      image: 'assets/clinic-1.jpg', 
      description: 'Leading dental clinic with state-of-the-art technology and international certifications.'
    },
    {
      id: 2,
      name: 'Centre Ophtalmologique Carthage',
      location: 'Carthage',
      specialty: 'Ophthalmology',
      rating: 4.9,
      image: 'assets/clinic-2.jpg',
      description: 'Premium eye care center specializing in LASIK and cataract surgery.'
    },
    {
      id: 3,
      name: 'Clinique Esthetique Sousse',
      location: 'Sousse',
      specialty: 'Cosmetic Surgery',
      rating: 4.7,
      image: 'assets/clinic-3.jpg',
      description: 'Expert cosmetic and reconstructive surgery with a focus on patient satisfaction.'
    },
    {
      id: 4,
      name: 'Clinique Internationale Hannibal',
      location: 'Tunis',
      specialty: 'Multi-specialty',
      rating: 4.6,
      image: 'assets/clinic-1.jpg',
      description: 'Leading international clinic with comprehensive medical services and modern facilities.'
    },
    {
      id: 5,
      name: 'Centre Médical Monastir',
      location: 'Monastir',
      specialty: 'Cardiology',
      rating: 4.8,
      image: 'assets/clinic-2.jpg',
      description: 'Specialized cardiac care center with experienced cardiologists and advanced equipment.'
    },
    {
      id: 6,
      name: 'Polyclinique Sfax',
      location: 'Sfax',
      specialty: 'Orthopedics',
      rating: 4.5,
      image: 'assets/clinic-3.jpg',
      description: 'Advanced orthopedic treatments and rehabilitation services for all age groups.'
    }
  ];

  filteredClinics = [...this.clinics];

  filterClinics() {
    if (!this.searchTerm.trim()) {
      this.filteredClinics = [...this.clinics];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredClinics = this.clinics.filter(clinic =>
      clinic.name.toLowerCase().includes(searchLower) ||
      clinic.location.toLowerCase().includes(searchLower) ||
      clinic.specialty.toLowerCase().includes(searchLower)
    );
  }
  navigateToClinic(clinicId: number) {
  this.router.navigate(['/clinic', clinicId]);
}

}