import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-clinics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-clinics.component.html',
  styleUrl: './featured-clinics.component.css'
})
export class FeaturedClinicsComponent {
  clinics = [
    {
      id: 1,
      name: 'Clinique El Manar',
      location: 'Tunis',
      specialty: 'Dental Care',
      rating: 4.8,
      image: 'assets/clinic-1.jpg', // You'll add these images later
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
    }
  ];
}
