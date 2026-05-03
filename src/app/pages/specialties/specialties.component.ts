import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { SpecialtyService } from '../../services/specialty.service';
import { Specialty } from '../../models/specialty.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './specialties.component.html',
  styleUrl: './specialties.component.css'
})
export class SpecialtiesComponent implements OnInit {
  constructor(
    private specialtyService: SpecialtyService,
    private sanitizer: DomSanitizer
  ) { }
  searchTerm: string = '';
  specialties: Specialty[] = [];
  loading: boolean = false;
  filteredSpecialties: Specialty[] = [];

  // Icon mapping
iconMap: { [key: string]: string } = {
  'Dental Care': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3c-1.2 0-2.4.5-3.2 1.4C8 5.2 7.5 5 7 5 5.3 5 4 7 4 9.5c0 1.5.4 3 1 4.2.7 1.3 1.3 2.5 1.5 4.3.1 1 .9 3 2 3s1.5-1.5 1.8-2.8c.2-.8.4-1.2.7-1.2s.5.4.7 1.2C12 19.5 12.4 21 13.5 21s1.9-2 2-3c.2-1.8.8-3 1.5-4.3.6-1.2 1-2.7 1-4.2C18 7 16.7 5 15 5c-.5 0-1 .2-1.8 1.4C12.4 3.5 12 3 12 3z"/>`,
  'Cardiology': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12h2l2-7 3 14 3-10 2 3h4"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21c-4-2.5-8-6-8-10a5 5 0 0110 0 5 5 0 0110 0c0 4-4 7.5-8 10"/>`,
  'Dermatology': `<ellipse cx="12" cy="12" rx="9" ry="9" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 16c.8.6 1.9 1 3 1 1.2 0 2.2-.4 3-1"/><circle cx="15" cy="9" r="1" fill="currentColor"/>`,
  'Ophthalmology': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>`,
  'Orthopedics': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3c0 1.5.5 2.5 1.5 3L9 8.5C7.5 10 7 11.5 7 13c0 2.5 1.5 4.5 3 5.5v2.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 3c0 1.5-.5 2.5-1.5 3L15 8.5c1.5 1.5 2 3 2 4.5 0 2.5-1.5 4.5-3 5.5V21"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 13h4M10 10h4"/>`,
  'Pediatrics': `<circle cx="12" cy="7" r="3.5" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 21v-2a7 7 0 0114 0v2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.5l1 1.5h4l1-1.5"/>`,
  'General Surgery': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v4M8 5l2.5 2.5M16 5l-2.5 2.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 10h12l-1.5 9a1 1 0 01-1 .9H8.5a1 1 0 01-1-.9L6 10z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 14v3M12 13v4M14 14v3"/>`,
  'Neurology': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4c-2 0-4 1-5 2.5C5.5 8 5 10 5.5 12c.3 1.5 1 2.8 2 3.8V20h9v-4.2c1-.9 1.7-2.2 2-3.8.5-2-.5-4-1.5-5.5C16 5 14 4 12 4z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20v1M15 20v1M9 12c1-1 3-1 4 0M7.5 9c.5-.5 1.5-.8 2.5-.5M16.5 9c-.5-.5-1.5-.8-2.5-.5"/>`,
  'Gynecology': `<circle cx="12" cy="8" r="4" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 12v9M9 18h6"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 6.5C8.5 5 10 4 12 4s3.5 1 4 2.5"/>`,
  'Radiology': `<rect x="4" y="5" width="16" height="14" rx="2" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10c0-1.1.4-2 1-2.7M12 8v8M16 10c0-1.1-.4-2-1-2.7"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14c.5.8 1.4 1.3 2.5 1.3s2-.5 2.5-1.3"/>`,
  'ENT': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 5c0-1.1.9-2 2-2s2 .9 2 2v7a2 2 0 01-4 0V5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 11a5 5 0 0010 0"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 16v3M9 19h6"/>`,
  'Cosmetic Surgery': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 15l.6 1.4L7 17l-1.4.6L5 19l-.6-1.4L3 17l1.4-.6L5 15z"/>`,
  'Hair Transplant': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3C9 3 6 5.5 6 9c0 2 .8 3.8 2 5l-1 7h10l-1-7c1.2-1.2 2-3 2-5 0-3.5-3-6-7-6z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 9c.5-1.5 1.5-2.5 3-2.5M8 14h8"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6V3M12 5V2M14 6V3"/>`,
  'Bariatric Surgery': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 6a4 4 0 018 0c0 1-.3 2-.8 2.8L17 21H7L8.8 8.8A4 4 0 018 6z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 12c.5 1 1 1.5 2 1.5s1.5-.5 2-1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 16h6"/>`,
  'Fertility & IVF': `<circle cx="12" cy="10" r="4" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 9.5c.5-1 1.5-1.8 3-1.8"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 17c0-1 .4-2 1-2.7M17 17c0-1-.4-2-1-2.7"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 21a7 7 0 0114 0"/><circle cx="18" cy="6" r="2" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 6c1-.5 2-.3 2.5.5"/>`,
  'Oncology': `<circle cx="12" cy="12" r="3" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v3M12 18v3M3 12h3M18 12h3"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="7" stroke-width="1.5" stroke-dasharray="2 2"/>`,
  'Spine Surgery': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v18"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5h6M9 8.5h6M9 12h6M9 15.5h6M9 19h6"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 5c-1 .5-2 1.5-2 3s1 2.5 2 3M16 5c1 .5 2 1.5 2 3s-1 2.5-2 3"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12.5c-1 .5-2 1.5-2 3s1 2.5 2 3M16 12.5c1 .5 2 1.5 2 3s-1 2.5-2 3"/>`,
  'Urology': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 4c0 4-2 6-2 9a6 6 0 0012 0c0-3-2-5-2-9"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 4h4"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13c0-1.7 1.3-3 3-3s3 1.3 3 3"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10v5M10 18h4"/>`,
  'Plastic Surgery': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 20l4-4m0 0l6-10 4 4-10 6zm4-4l2-2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 4l2 2-1.5 1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 16l-4 4"/><circle cx="18" cy="5" r="1.5" stroke-width="1.5"/>`,
  'Vascular Surgery': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3c0 0-4 3-4 8 0 2.5 1 4.5 2.5 6L12 21l1.5-4C15 15.5 16 13.5 16 11c0-5-4-8-4-8z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 8c-2 1-3 2.5-3 5M16 8c2 1 3 2.5 3 5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6"/>`,
  'Endocrinology': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3c-2.5 3-4 5-4 8a4 4 0 008 0c0-3-1.5-5-4-8z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v6M9 18h6"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10c.5-1.5 2-2.5 4-2.5"/><circle cx="17" cy="6" r="2.5" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 8.5l-2 2.5"/>`,
  'Psychiatry': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4c-2.2 0-4 1.4-4 3.5 0 1 .4 2 1 2.7-.3.5-.5 1-.5 1.8 0 2 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5c0-.8-.2-1.3-.5-1.8.6-.7 1-1.7 1-2.7C16 5.4 14.2 4 12 4z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 8.5c.5-.3 1.2-.5 2-.5M12 12v3M10 18c.5.7 1.2 1 2 1s1.5-.3 2-1"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 19c-1-.8-2-2-2-4M17 19c1-.8 2-2 2-4"/>`,
  'Rheumatology': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3l1 3-2 2 3 1 1 3 1-3 3-1-2-2 1-3-3 1-3-1z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 13c-1.5 1-2.5 2.5-2.5 4.5C4.5 20 6 21.5 8 21.5c1.5 0 2.8-.8 3.5-2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 14c1 1.5 2.8 2.5 4 2 1.5-.5 2.3-2.2 1.8-3.7-.4-1.2-1.5-2-2.8-2"/>`,
  'Physiotherapy': `<circle cx="12" cy="5" r="2" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 10c2-2 4-3 7-3s5 1 7 3"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7v5l-3 4M12 12l3 4"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 21l-1-4M15 21l1-4"/>`,
  'Wellness & Prevention': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21C7 17 3 13.5 3 9a5 5 0 019-3 5 5 0 019 3c0 4.5-4 8-9 12z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10v4M10 12h4"/>`,
  'Stem Cell Therapy': `<circle cx="12" cy="12" r="3" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4c1 1.5 2.5 2 4 1.5M12 4c-1 1.5-2.5 2-4 1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 12c-1.5 1-2 2.5-1.5 4M20 12c-1.5-1-2-2.5-1.5-4"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 20c-1-1.5-2.5-2-4-1.5M12 20c1-1.5 2.5-2 4-1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 12c1.5-1 2-2.5 1.5-4M4 12c1.5 1 2 2.5 1.5 4"/>`,
  'Pulmonology': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v6"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10c-2 0-5 1-6 3.5-.8 2-.5 4.5 2 5.5 1.5.6 3 0 4-1v-3"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10c2 0 5 1 6 3.5.8 2 .5 4.5-2 5.5-1.5.6-3 0-4-1v-3"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 15c.5.8 1.2 1.3 2 1.3s1.5-.5 2-1.3"/>`,
  'Gastroenterology': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 5c0 0-2 2-2 5 0 1.5.5 3 1.5 4"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 5c0 0 2 2 2 5 0 1.5-.5 3-1.5 4"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 14C8 17 10 19 12 19s4-2 4.5-5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 8c-.5 1.5-.5 3 0 4.5M14 8c.5 1.5.5 3 0 4.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19v2M14 19v2M9 21h6"/>`,
  'Nephrology': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 6C6 7 4 9.5 4 12.5c0 3.5 2.5 6 5 5.5 1.5-.3 2.5-1.5 3-3"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 6c2 1 4 3.5 4 6.5 0 3.5-2.5 6-5 5.5-1.5-.3-2.5-1.5-3-3"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v6M10 19h4"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 10c.3-1.5 1.2-2.8 3-3M15 10c-.3-1.5-1.2-2.8-3-3"/>`
};

getIconSvg(iconName: string | undefined): string {
  if (!iconName) return '';
  return this.iconMap[iconName] || '';
}

getSafeIconSvg(iconName: string | undefined): SafeHtml {
  const paths = this.getIconSvg(iconName);
  if (!paths) return '';
  return this.sanitizer.bypassSecurityTrustHtml(
    `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">${paths}</svg>`
  );
}

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
