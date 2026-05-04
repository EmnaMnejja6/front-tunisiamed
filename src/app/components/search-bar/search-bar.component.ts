import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  location: string = '';
  specialty: string = '';

  constructor(private router: Router) {}

  onSearch() {
    const queryParams: any = {};
    
    if (this.specialty.trim()) {
      queryParams.specialty = this.specialty.trim();
    }
    
    // Note: The clinics page currently filters by specialty and search term
    // Location can be searched using the general search term
    if (this.location.trim()) {
      queryParams.location = this.location.trim();
    }
    
    this.router.navigate(['/clinics'], { queryParams });
  }
}
