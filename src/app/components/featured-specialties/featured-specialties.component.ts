import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialtyService } from '../../services/specialty.service';
import { Specialty } from '../../models/specialty.model';

@Component({
  selector: 'app-featured-specialties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-specialties.component.html',
  styleUrl: './featured-specialties.component.css'
})
export class FeaturedSpecialtiesComponent implements OnInit {
  specialties: Specialty[] = [];

  constructor(private specialtyService: SpecialtyService) {}

  ngOnInit(): void {
    this.loadSpecialties();
  }

  loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe({
      next: (data) => {
        // Take first 5 specialties
        this.specialties = data.slice(0, 5);
      },
      error: (error) => {
        console.error('Error loading specialties:', error);
      }
    });
  }

  getIconType(label: string): string {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('dental') || lowerLabel.includes('dent')) return 'dental';
    if (lowerLabel.includes('eye') || lowerLabel.includes('ophthal')) return 'eye';
    if (lowerLabel.includes('surgery') || lowerLabel.includes('cosmetic') || lowerLabel.includes('plastic')) return 'surgery';
    if (lowerLabel.includes('bone') || lowerLabel.includes('orthop')) return 'bone';
    if (lowerLabel.includes('heart') || lowerLabel.includes('cardio')) return 'heart';
    return 'heart'; // default icon
  }
}
