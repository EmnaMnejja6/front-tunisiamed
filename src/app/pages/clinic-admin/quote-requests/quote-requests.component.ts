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
    if (!user) {
      console.error('No user found in auth service');
      return;
    }

    this.clinicService.getClinicsByAdmin(user.id).subscribe({
      next: (clinics) => {
        if (clinics.length > 0) {
          this.clinic = clinics[0];
          this.loadQuoteRequests();
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading clinics:', err);
        this.isLoading = false;
      }
    });
  }

  loadQuoteRequests() {
    if (!this.clinic) return;
    
    this.quoteRequestService.getQuoteRequests('PENDING').subscribe({
      next: (requests: any[]) => {
        // Filter requests to only show those matching clinic's specialties
        const clinicSpecialtyIds = this.clinic!.specialties?.map(s => s.id) || [];
        
        this.quoteRequests = requests.filter(request => {
          // If request has no specialty, show it to all clinics
          if (!request.specialty || !request.specialty.id) {
            return true;
          }
          // Only show if clinic has the matching specialty
          return clinicSpecialtyIds.includes(request.specialty.id);
        });
        
        console.log(`Filtered ${this.quoteRequests.length} quote requests out of ${requests.length} total`);
      },
      error: (err) => {
        console.error('Error loading quote requests:', err);
      }
    });
  }

  openResponseModal(request: any) {
    this.selectedRequest = request;
    
    // Check if clinic has the required specialty first (synchronous check)
    if (this.clinic && request.specialty) {
      const hasSpecialty = this.clinic.specialties?.some(
        (s: any) => s.id === request.specialty.id
      );
      
      if (!hasSpecialty) {
        console.warn('Clinic does not have the required specialty:', request.specialty.label);
        const proceed = confirm(`Your clinic does not currently offer ${request.specialty.label}. Do you still want to submit a response?`);
        if (!proceed) return;
      }
    }
    
    // Check if clinic has already responded to this request (async check)
    if (this.clinic) {
      this.quoteResponseService.getResponsesByClinic(this.clinic.id).subscribe({
        next: (responses) => {
          const existingResponse = responses.find(r => r.quoteRequestId === request.id);
          if (existingResponse) {
            console.warn('Clinic has already responded to this quote request:', existingResponse);
            alert('Your clinic has already submitted a response to this quote request.');
            return;
          }
          
          // Only open modal if no existing response found
          this.responseForm = {
            estimatedPrice: 0,
            message: ''
          };
          this.showResponseModal = true;
        },
        error: (err) => {
          console.error('Error checking existing responses:', err);
          // Open modal anyway if check fails
          this.responseForm = {
            estimatedPrice: 0,
            message: ''
          };
          this.showResponseModal = true;
        }
      });
    } else {
      // No clinic, just open modal
      this.responseForm = {
        estimatedPrice: 0,
        message: ''
      };
      this.showResponseModal = true;
    }
  }

  closeResponseModal() {
    this.showResponseModal = false;
    this.selectedRequest = null;
  }

  submitResponse() {
    if (!this.clinic || !this.selectedRequest) {
      console.error('Missing clinic or selected request', { clinic: this.clinic, selectedRequest: this.selectedRequest });
      return;
    }

    // Validate form data
    if (!this.responseForm.estimatedPrice || this.responseForm.estimatedPrice <= 0) {
      alert('Please enter a valid estimated price');
      return;
    }

    if (!this.responseForm.message || this.responseForm.message.trim() === '') {
      alert('Please enter a message');
      return;
    }

    const user = this.authService.getUser();
    const response: CreateQuoteResponse = {
      quoteRequestId: this.selectedRequest.id,
      clinicId: this.clinic.id,
      estimatedPrice: this.responseForm.estimatedPrice,
      message: this.responseForm.message.trim()
    };

    console.log('Submitting quote response:', response);

    this.quoteResponseService.createResponse(response).subscribe({
      next: () => {
        // Update quote request status to RESPONDED after successful response
        this.quoteRequestService.updateQuoteRequestStatus(this.selectedRequest.id, 'RESPONDED').subscribe({
          next: () => {
            alert('Response submitted successfully!');
            this.closeResponseModal();
            this.loadQuoteRequests();
          },
          error: (statusErr) => {
            console.error('Error updating quote request status:', statusErr);
            // Still show success since the response was created
            alert('Response submitted successfully!');
            this.closeResponseModal();
            this.loadQuoteRequests();
          }
        });
      },
      error: (err) => {
        console.error('Error submitting response:', err);
        console.error('Error status:', err.status);
        console.error('Error body:', err.error);
        
        let errorMessage = 'Failed to submit response';
        
        if (err.status === 401) {
          errorMessage = 'Authentication failed. Please log in again.';
        } else if (err.status === 403) {
          errorMessage = 'Permission denied. Please check:\n' +
            '• Your clinic has the required specialty\n' +
            '• You haven\'t already responded to this request\n' +
            '• The quote request is still open\n\n' +
            'Contact support if the issue persists.';
        } else if (err.status === 400) {
          errorMessage = err.error?.message || 'Invalid request data. Please check all fields.';
        } else if (err.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (err.error?.message) {
          errorMessage = err.error.message;
        }
        
        alert(errorMessage);
      }
    });
  }
}
