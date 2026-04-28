import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
stats = [
  { icon: 'shield', value: '150+', label: 'Certified Clinics' },
  { icon: 'users', value: '500+', label: 'Specialists' },
  { icon: 'heart', value: '10K+', label: 'Patients Served' },
  { icon: 'dollar', value: '60%', label: 'Cost Savings' }
];

}
