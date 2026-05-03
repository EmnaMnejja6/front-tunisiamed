import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

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
  clinicAdmins: User[] = [];
  availableClinicAdmins: User[] = [];
  isLoading = true;
  showModal = false;
  showCredentialsModal = false;
  isEditMode = false;
  searchTerm = '';
  selectedClinicAdmin: User | null = null;
  
  clinicForm = {
    id: null as number | null,
    name: '',
    description: '',
    address: '',
    city: '',
    latitude: 0,
    longitude: 0,
    phone: '',
    email: '',
    imageUrl: '',
    clinicAdminId: null as number | null
  };

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadClinics();
    this.loadClinicAdmins();
  }

  loadClinicAdmins(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.clinicAdmins = data.filter(user => user.role === 'CLINIC_ADMIN');
        this.updateAvailableClinicAdmins();
      },
      error: (error) => {
        console.error('Error loading clinic admins:', error);
      }
    });
  }

  updateAvailableClinicAdmins(): void {
    // Get all assigned clinic admin IDs, excluding the current clinic being edited
    const assignedAdminIds = new Set(
      this.clinics
        .filter(clinic => clinic.clinicAdminId && clinic.id !== this.clinicForm.id)
        .map(clinic => clinic.clinicAdminId)
    );

    // Filter out assigned admins
    this.availableClinicAdmins = this.clinicAdmins.filter(
      admin => !assignedAdminIds.has(admin.id)
    );
  }

  loadClinics(): void {
    this.isLoading = true;
    this.http.get<any[]>('https://back-tunisiamed.onrender.com/api/clinics').subscribe({
      next: (data) => {
        this.clinics = data;
        this.filteredClinics = data;
        this.isLoading = false;
        this.updateAvailableClinicAdmins();
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
    this.isEditMode = false;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  openEditModal(clinic: any): void {
    this.isEditMode = true;
    this.clinicForm = {
      id: clinic.id,
      name: clinic.name,
      description: clinic.description || '',
      address: clinic.address || '',
      city: clinic.city,
      latitude: clinic.latitude || 0,
      longitude: clinic.longitude || 0,
      phone: clinic.phone || '',
      email: clinic.email || '',
      imageUrl: clinic.imageUrl || '',
      clinicAdminId: clinic.clinicAdminId
    };
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    this.isEditMode = false;
    this.resetForm();
    document.body.style.overflow = 'auto';
  }

  viewClinicAdminCredentials(clinicAdminId: number): void {
    const admin = this.clinicAdmins.find(a => a.id === clinicAdminId);
    if (admin) {
      this.selectedClinicAdmin = admin;
      this.showCredentialsModal = true;
      document.body.style.overflow = 'hidden';
    }
  }

  closeCredentialsModal(): void {
    this.showCredentialsModal = false;
    this.selectedClinicAdmin = null;
    document.body.style.overflow = 'auto';
  }

  resetForm(): void {
    this.clinicForm = {
      id: null,
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

  saveClinic(): void {
    if (this.isEditMode) {
      this.updateClinic();
    } else {
      this.createClinic();
    }
  }

  updateClinic(): void {
    if (!this.clinicForm.id) return;

    if (!this.clinicForm.name || !this.clinicForm.city) {
      alert('Please fill in at least the name and city');
      return;
    }

    if (!this.clinicForm.clinicAdminId) {
      alert('Please select a clinic admin');
      return;
    }

    const requestBody = {
      name: this.clinicForm.name,
      description: this.clinicForm.description || '',
      address: this.clinicForm.address || '',
      city: this.clinicForm.city,
      latitude: Number(this.clinicForm.latitude) || 0,
      longitude: Number(this.clinicForm.longitude) || 0,
      phone: this.clinicForm.phone || '',
      email: this.clinicForm.email || '',
      imageUrl: this.clinicForm.imageUrl || '',
      clinicAdminId: Number(this.clinicForm.clinicAdminId)
    };

    this.http.put(`https://back-tunisiamed.onrender.com/api/clinics/${this.clinicForm.id}`, requestBody).subscribe({
      next: (response) => {
        console.log('Clinic updated:', response);
        this.loadClinics();
        this.loadClinicAdmins();
        this.closeModal();
        alert('Clinic updated successfully!');
      },
      error: (error) => {
        console.error('Error updating clinic:', error);
        const errorMsg = error.error?.message || error.message || 'Failed to update clinic';
        alert(errorMsg);
      }
    });
  }

  createClinic(): void {
    console.log('Creating clinic:', this.clinicForm);
    
    if (!this.clinicForm.name || !this.clinicForm.city) {
      alert('Please fill in at least the name and city');
      return;
    }

    if (!this.clinicForm.clinicAdminId) {
      alert('Please select a clinic admin');
      return;
    }

    // Verify the selected clinic admin exists in available list
    const selectedAdmin = this.availableClinicAdmins.find(
      admin => admin.id === Number(this.clinicForm.clinicAdminId)
    );

    if (!selectedAdmin) {
      alert('Invalid clinic admin selected. Please refresh and try again.');
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    console.log('Auth token exists:', !!token);
    console.log('User:', user);
    console.log('Selected clinic admin:', selectedAdmin);

    if (!token || !user) {
      alert('You are not logged in. Please log in again.');
      return;
    }

    if (user.role !== 'ADMIN') {
      alert('You do not have admin permissions to create clinics.');
      return;
    }

    // Prepare the request body - ensure clinicAdminId is a number
    const requestBody = {
      name: this.clinicForm.name,
      description: this.clinicForm.description || '',
      address: this.clinicForm.address || '',
      city: this.clinicForm.city,
      latitude: Number(this.clinicForm.latitude) || 0,
      longitude: Number(this.clinicForm.longitude) || 0,
      phone: this.clinicForm.phone || '',
      email: this.clinicForm.email || '',
      imageUrl: this.clinicForm.imageUrl || '',
      clinicAdminId: Number(this.clinicForm.clinicAdminId)
    };

    console.log('Request body:', requestBody);

    this.http.post('https://back-tunisiamed.onrender.com/api/clinics', requestBody).subscribe({
      next: (response) => {
        console.log('Clinic created:', response);
        this.loadClinics();
        this.loadClinicAdmins();
        this.closeModal();
        alert('Clinic created successfully!');
      },
      error: (error) => {
        console.error('Error creating clinic:', error);
        console.error('Error status:', error.status);
        console.error('Error details:', error.error);
        
        let errorMsg = 'Failed to create clinic. ';
        
        if (error.status === 403) {
          errorMsg += 'Access denied. The clinic admin may already be assigned to another clinic, or you may not have permission.';
        } else if (error.status === 400) {
          errorMsg += error.error?.message || 'Invalid data provided.';
        } else if (error.status === 401) {
          errorMsg += 'Authentication failed. Please log in again.';
        } else {
          errorMsg += error.error?.message || error.message || 'Unknown error';
        }
        
        alert(errorMsg);
      }
    });
  }

  deleteClinic(id: number): void {
    if (confirm('Are you sure you want to delete this clinic?')) {
      this.http.delete(`https://back-tunisiamed.onrender.com/api/clinics/${id}`).subscribe({
        next: () => {
          this.loadClinics();
          this.loadClinicAdmins();
        }
      });
    }
  }
}
