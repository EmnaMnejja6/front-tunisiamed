import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ClinicService } from '../../../services/clinic.service';
import { QuoteRequestService } from '../../../services/quote-request.service';
import { QuoteResponseService, CreateQuoteResponse } from '../../../services/quote-response.service';
import { Clinic } from '../../../models/clinic.model';

@Component({
  selector: 'app-quote-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-requests.component.html',
  styleUrl: './quote-requests.component.css'
})
export class QuoteRequestsComponent implements OnInit {
  clinic: Clinic | null = null;
  quoteRequests: any[] = [];
  isLoading = true;
  showResponseModal = false;
  selectedRequest: any = null;

  responseForm = {
    estimatedPrice: 0,
    message: ''
  };

  constructor(
    private authService: AuthService,
    private clinicService: ClinicService,
    private quoteRequestService: QuoteRequestService,
    private quoteResponseService: QuoteResponseService
  ) {}

  ngOnInit() {
    this.loadClinicAndRequests();
  }

  loadClinicAndRequests() {
    const user = this.authService.getUser();
    if (!user) return;

    this.clinicService.getClinicsByAdmin(user.id).subscribe({
      next: (clinics) => {
        if (clinics.length > 0) {
          this.clinic = clinics[0];
          this.loadQuoteRequests();
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadQuoteRequests() {
    this.quoteRequestService.getQuoteRequests('PENDING').subscribe({
      next: (requests: any[]) => {
        this.quoteRequests = requests;
      }
    });
  }

  openResponseModal(request: any) {
    this.selectedRequest = request;
    this.responseForm = {
      estimatedPrice: 0,
      message: ''
    };
    this.showResponseModal = true;
  }

  closeResponseModal() {
    this.showResponseModal = false;
    this.selectedRequest = null;
  }

  submitResponse() {
    if (!this.clinic || !this.selectedRequest) return;

    const response: CreateQuoteResponse = {
      quoteRequestId: this.selectedRequest.id,
      clinicId: this.clinic.id,
      estimatedPrice: this.responseForm.estimatedPrice,
      message: this.responseForm.message
    };

    this.quoteResponseService.createResponse(response).subscribe({
      next: () => {
        alert('Response submitted successfully!');
        this.closeResponseModal();
        this.loadQuoteRequests();
      },
      error: (err) => {
        console.error('Error submitting response:', err);
        alert('Failed to submit response');
      }
    });
  }
}
