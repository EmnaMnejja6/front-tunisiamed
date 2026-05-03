import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

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

  closeQuote(id: number): void {
    if (confirm('Are you sure you want to close this quote request?')) {
      this.http.patch(`https://back-tunisiamed.onrender.com/api/quote-requests/${id}/close`, {}).subscribe({
        next: () => {
          this.loadQuotes();
        }
      });
    }
  }
}
