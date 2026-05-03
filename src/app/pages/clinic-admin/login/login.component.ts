import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-clinic-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class ClinicAdminLoginComponent {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        if (success) {
          const user = this.authService.getUser();
          if (user?.role === 'CLINIC_ADMIN') {
            this.router.navigate(['/clinic-admin']);
          } else {
            this.errorMessage = 'Access denied. Clinic admin credentials required.';
            this.authService.logout();
          }
        } else {
          this.errorMessage = 'Invalid email or password';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Login failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
