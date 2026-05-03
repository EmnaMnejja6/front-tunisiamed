import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { SpecialtyService } from '../../services/specialty.service';
import { Specialty } from '../../models/specialty.model';

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './specialties.component.html',
  styleUrl: './specialties.component.css'
})
export class SpecialtiesComponent implements OnInit {
  constructor(private specialtyService: SpecialtyService) { }
  searchTerm: string = '';
  specialties: Specialty[] = [];
  loading: boolean = false;
  filteredSpecialties: Specialty[] = [];

  filterSpecialties() {
    if (!this.searchTerm.trim()) {
      this.filteredSpecialties = [...this.specialties];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredSpecialties = this.specialties.filter(specialty =>
      specialty.label.toLowerCase().includes(searchLower) ||
      specialty.description?.toLowerCase().includes(searchLower)
    );
  }

  ngOnInit() {
    this.loading = true;
    this.specialtyService.getSpecialties().subscribe({
      next: (data) => {
        this.specialties = data;
        this.filteredSpecialties = [...data];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching specialties:', error);
        this.loading = false;
      }
    });
  }

}
