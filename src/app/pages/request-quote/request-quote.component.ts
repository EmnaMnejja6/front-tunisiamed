import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { QuoteRequestService, CreateQuoteRequest } from '../../services/quote-request.service';
import { SpecialtyService } from '../../services/specialty.service';
import { Specialty } from '../../models/specialty.model';

interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  dateOfBirth: string;
}

interface ProcedureInfo {
  specialtyId: number;
  description: string;
}

@Component({
  selector: 'app-request-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-quote.component.html',
  styleUrl: './request-quote.component.css'
})
export class RequestQuoteComponent implements OnInit {
  currentStep = 1;
  totalSteps = 3;
  isDropdownOpen = false;
  searchTerm = '';
  isSubmitting = false;
  isLoadingSpecialties = true;

  patientInfo: PatientInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    dateOfBirth: ''
  };

  procedureInfo: ProcedureInfo = {
    specialtyId: 0,
    description: ''
  };

  specialties: Specialty[] = [];
  selectedSpecialtyLabel = '';
  selectedClinicId: number | null = null;
  selectedClinicName: string = '';

  constructor(
    private quoteRequestService: QuoteRequestService,
    private specialtyService: SpecialtyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadSpecialties();
    
    // Get clinic info from query params
    this.route.queryParams.subscribe(params => {
      if (params['clinicId']) {
        this.selectedClinicId = +params['clinicId'];
      }
      if (params['clinicName']) {
        this.selectedClinicName = params['clinicName'];
      }
    });
  }

  loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe({
      next: (data) => {
        this.specialties = data;
        this.isLoadingSpecialties = false;
      },
      error: (err) => {
        console.error('Error loading specialties:', err);
        this.isLoadingSpecialties = false;
      }
    });
  }

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
    if (!this.isStepValid() || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const quoteRequest: CreateQuoteRequest = {
      fname: this.patientInfo.firstName,
      lname: this.patientInfo.lastName,
      email: this.patientInfo.email,
      phone: this.patientInfo.phone,
      country: this.patientInfo.country,
      dateofBirth: this.patientInfo.dateOfBirth,
      description: this.procedureInfo.description,
      specialtyId: this.procedureInfo.specialtyId,
      clinicId: this.selectedClinicId || undefined
    };

    this.quoteRequestService.createQuoteRequest(quoteRequest).subscribe({
      next: (response) => {
        alert('Quote request submitted successfully! We will contact you soon.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error submitting quote request:', err);
        alert('Failed to submit quote request. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(this.patientInfo.firstName && 
                 this.patientInfo.lastName && 
                 this.patientInfo.email && 
                 this.patientInfo.phone && 
                 this.patientInfo.country &&
                 this.patientInfo.dateOfBirth);
      case 2:
        return !!(this.procedureInfo.specialtyId && this.procedureInfo.description);
      case 3:
        return true;
      default:
        return false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectSpecialty(specialty: Specialty) {
    this.procedureInfo.specialtyId = specialty.id;
    this.selectedSpecialtyLabel = specialty.label;
    this.isDropdownOpen = false;
    this.searchTerm = '';
  }

  get filteredSpecialties() {
    if (!this.searchTerm) {
      return this.specialties;
    }
    return this.specialties.filter(specialty => 
      specialty.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
  }
}
