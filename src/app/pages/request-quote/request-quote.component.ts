import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

interface ProcedureInfo {
  specialty: string;
  description: string;
}

@Component({
  selector: 'app-request-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-quote.component.html',
  styleUrl: './request-quote.component.css'
})
export class RequestQuoteComponent {
  currentStep = 1;
  totalSteps = 3;
  isDropdownOpen = false;
  searchTerm = '';

  patientInfo: PatientInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: ''
  };

  procedureInfo: ProcedureInfo = {
    specialty: '',
    description: ''
  };

  specialties = [
    'Cardiology',
    'Cosmetic Surgery',
    'Dental Care',
    'Dermatology', 
    'Gastroenterology',
    'Neurology',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Surgery'
  ];

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitQuote() {
    console.log('Patient Info:', this.patientInfo);
    console.log('Procedure Info:', this.procedureInfo);
    // Here you would typically send the data to your backend
    alert('Quote request submitted successfully!');
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(this.patientInfo.firstName && 
                 this.patientInfo.lastName && 
                 this.patientInfo.email && 
                 this.patientInfo.phone && 
                 this.patientInfo.dateOfBirth);
      case 2:
        return !!(this.procedureInfo.specialty && this.procedureInfo.description);
      case 3:
        return true;
      default:
        return false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectSpecialty(specialty: string) {
    this.procedureInfo.specialty = specialty;
    this.isDropdownOpen = false;
    this.searchTerm = '';
  }

  get filteredSpecialties() {
    if (!this.searchTerm) {
      return this.specialties;
    }
    return this.specialties.filter(specialty => 
      specialty.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
  }
}
