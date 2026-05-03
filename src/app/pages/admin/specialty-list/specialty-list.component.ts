import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-specialty-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './specialty-list.component.html',
  styleUrl: './specialty-list.component.css'
})
export class SpecialtyListComponent implements OnInit {
  specialties: any[] = [];
  isLoading = true;
  showModal = false;
  isEditMode = false;
  
  specialtyForm = {
    id: null as number | null,
    label: '',
    description: '',
    iconUrl: ''
  };

  // Predefined SVG icon options for common medical specialties (limited to 12)
  iconOptions = [
    { 
      name: 'Dental Care',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>'
    },
    { 
      name: 'Cardiology',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>'
    },
    { 
      name: 'Dermatology',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>'
    },
    { 
      name: 'Ophthalmology',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>'
    },
    { 
      name: 'Orthopedics',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>'
    },
    { 
      name: 'Pediatrics',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
    },
    { 
      name: 'General Surgery',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>'
    },
    { 
      name: 'Neurology',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>'
    },
    { 
      name: 'Gynecology',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>'
    },
    { 
      name: 'Radiology',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>'
    },
    { 
      name: 'ENT',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>'
    },
    { 
      name: 'Cosmetic Surgery',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>'
    }
  ];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadSpecialties();
  }

  loadSpecialties(): void {
    this.isLoading = true;
    this.http.get<any[]>('https://back-tunisiamed.onrender.com/api/specialties').subscribe({
      next: (data) => {
        this.specialties = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  openModal(specialty?: any): void {
    if (specialty) {
      this.isEditMode = true;
      this.specialtyForm = { ...specialty };
    } else {
      this.isEditMode = false;
      this.resetForm();
    }
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
    document.body.style.overflow = 'auto';
  }

  resetForm(): void {
    this.specialtyForm = {
      id: null,
      label: '',
      description: '',
      iconUrl: ''
    };
  }

  saveSpecialty(): void {
    console.log('Saving specialty:', this.specialtyForm);
    
    if (!this.specialtyForm.label || !this.specialtyForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    console.log('Auth token exists:', !!token);
    console.log('User:', user);

    if (!token || !user) {
      alert('You are not logged in. Please log in again.');
      return;
    }

    if (user.role !== 'ADMIN') {
      alert('You do not have admin permissions to manage specialties.');
      return;
    }

    if (this.isEditMode && this.specialtyForm.id) {
      this.http.put(`https://back-tunisiamed.onrender.com/api/specialties/${this.specialtyForm.id}`, this.specialtyForm).subscribe({
        next: (response) => {
          console.log('Specialty updated:', response);
          this.loadSpecialties();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating specialty:', error);
          const errorMsg = error.error?.message || error.message || 'Unknown error';
          alert(`Failed to update specialty: ${errorMsg}\nStatus: ${error.status}`);
        }
      });
    } else {
      this.http.post('https://back-tunisiamed.onrender.com/api/specialties', this.specialtyForm).subscribe({
        next: (response) => {
          console.log('Specialty created:', response);
          this.loadSpecialties();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating specialty:', error);
          const errorMsg = error.error?.message || error.message || 'Unknown error';
          alert(`Failed to create specialty: ${errorMsg}\nStatus: ${error.status}`);
        }
      });
    }
  }

  deleteSpecialty(id: number): void {
    if (confirm('Are you sure you want to delete this specialty?')) {
      this.http.delete(`https://back-tunisiamed.onrender.com/api/specialties/${id}`).subscribe({
        next: () => {
          this.loadSpecialties();
        }
      });
    }
  }

  getIconSvg(iconName: string): SafeHtml {
    const icon = this.iconOptions.find(i => i.name === iconName);
    return icon ? this.sanitizer.bypassSecurityTrustHtml(icon.svg) : '';
  }
}
