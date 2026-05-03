import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ClinicService } from '../../../services/clinic.service';

@Component({
  selector: 'app-clinic-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class ClinicAdminLayoutComponent implements OnInit {
  userName: string = '';
  clinicName: string = 'Clinic Panel';

  constructor(
    private authService: AuthService,
    private clinicService: ClinicService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      this.userName = `${user.firstName} ${user.lastName}`;
      
      // Load clinic name
      this.clinicService.getClinicsByAdmin(user.id).subscribe({
        next: (clinics) => {
          if (clinics.length > 0) {
            this.clinicName = clinics[0].name;
          }
        },
        error: (err) => {
          console.error('Error loading clinic:', err);
        }
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
