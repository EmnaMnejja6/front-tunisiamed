import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User, CreateUserRequest } from '../../../models/user.model';

@Component({
  selector: 'app-clinic-admin-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinic-admin-list.component.html',
  styleUrl: './clinic-admin-list.component.css'
})
export class ClinicAdminListComponent implements OnInit {
  clinicAdmins: User[] = [];
  filteredAdmins: User[] = [];
  isLoading = true;
  showModal = false;
  searchTerm = '';
  
  adminForm: CreateUserRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadClinicAdmins();
  }

  loadClinicAdmins(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.clinicAdmins = data.filter(user => user.role === 'CLINIC_ADMIN');
        this.filteredAdmins = this.clinicAdmins;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading clinic admins:', error);
        this.isLoading = false;
      }
    });
  }

  filterAdmins(): void {
    if (!this.searchTerm) {
      this.filteredAdmins = this.clinicAdmins;
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredAdmins = this.clinicAdmins.filter(admin =>
      admin.firstName.toLowerCase().includes(term) ||
      admin.lastName.toLowerCase().includes(term) ||
      admin.email.toLowerCase().includes(term)
    );
  }

  openModal(): void {
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
    document.body.style.overflow = 'auto';
  }

  resetForm(): void {
    this.adminForm = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: ''
    };
  }

  createClinicAdmin(): void {
    if (!this.adminForm.firstName || !this.adminForm.lastName || !this.adminForm.email || !this.adminForm.password) {
      alert('Please fill in all required fields');
      return;
    }

    this.userService.createClinicAdmin(this.adminForm).subscribe({
      next: (response) => {
        console.log('Clinic admin created:', response);
        this.loadClinicAdmins();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error creating clinic admin:', error);
        const errorMsg = error.error?.message || error.message || 'Unknown error';
        alert(`Failed to create clinic admin: ${errorMsg}`);
      }
    });
  }

  deleteClinicAdmin(id: number): void {
    if (confirm('Are you sure you want to delete this clinic admin?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadClinicAdmins();
        },
        error: (error) => {
          console.error('Error deleting clinic admin:', error);
          alert('Failed to delete clinic admin');
        }
      });
    }
  }
}
