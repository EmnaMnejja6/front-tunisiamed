import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QuoteRequestService } from '../../../services/quote-request.service';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.css'
})
export class QuoteListComponent implements OnInit {
  quotes: any[] = [];
  filteredQuotes: any[] = [];
  isLoading = true;
  selectedStatus = '';

  constructor(
    private http: HttpClient,
    private quoteRequestService: QuoteRequestService
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.isLoading = true;
    const url = this.selectedStatus
      ? `https://back-tunisiamed.onrender.com/api/quote-requests?status=${this.selectedStatus}`
      : 'https://back-tunisiamed.onrender.com/api/quote-requests';

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.quotes = data;
        this.filteredQuotes = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  filterByStatus(): void {
    this.loadQuotes();
  }

  updateStatus(id: number, status: string): void {
    this.http.patch(`https://back-tunisiamed.onrender.com/api/quote-requests/${id}/status?status=${status}`, {}).subscribe({
      next: () => {
        this.loadQuotes();
      }
    });
  }

  deleteQuote(id: number): void {
    if (confirm('Are you sure you want to delete this quote request? This action cannot be undone.')) {
      this.quoteRequestService.deleteQuoteRequest(id).subscribe({
        next: () => {
          alert('Quote request deleted successfully');
          this.loadQuotes();
        },
        error: (err) => {
          console.error('Error deleting quote request:', err);
          alert('Failed to delete quote request. Please try again.');
        }
      });
    }
  }
}
