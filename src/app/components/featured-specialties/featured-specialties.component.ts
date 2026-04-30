import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-specialties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-specialties.component.html',
  styleUrl: './featured-specialties.component.css'
})
export class FeaturedSpecialtiesComponent {
  specialties = [
    { icon: 'dental', name: 'Dental Care', clinics: 24 },
    { icon: 'eye', name: 'Ophthalmology', clinics: 18 },
    { icon: 'surgery', name: 'Cosmetic Surgery', clinics: 31 },
    { icon: 'bone', name: 'Orthopedics', clinics: 15 },
    { icon: 'heart', name: 'Cardiology', clinics: 12 }
  ];
}
