import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuoteResponseService } from '../../services/quote-response.service';
import { QuoteOffer } from '../../models/quote.model';

@Component({
  selector: 'app-view-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-offers.component.html',
  styleUrl: './view-offers.component.css'
})
export class ViewOffersComponent implements OnInit {
  offers: QuoteOffer[] = [];
  loading = true;
  error = '';
  token = '';

  constructor(
    private route: ActivatedRoute,
    private quoteResponseService: QuoteResponseService
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'] || '';
    
    if (!this.token) {
      this.error = 'Invalid or missing token';
      this.loading = false;
      return;
    }

    this.loadOffers();
  }

  loadOffers() {
    this.quoteResponseService.getOffersByToken(this.token).subscribe({
      next: (offers) => {
        this.offers = offers;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load offers. Please check your link.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
