import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpecialtiesComponent } from '../../pages/specialties/specialties.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navItems = [
    { label: 'Home', link: '/' },
    { label: 'Clinics', link: '/clinics' },
    { label: 'Specialties', link: '/specialties' },
    { label: 'Request a Quote', link: '/request-quote' },
  ];
}
