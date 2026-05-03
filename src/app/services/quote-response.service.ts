import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuoteResponse {
  id: number;
  estimatedPrice: number;
  message: string;
  status: string;
  createdAt: Date;
  clinicId: number;
  clinicName: string;
  clinicCity: string;
  clinicImageUrl?: string;
  clinicRating?: number;
  quoteRequestId: number;
}

export interface CreateQuoteResponse {
  quoteRequestId: number;
  clinicId: number;
  estimatedPrice: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteResponseService {
  private readonly API_URL = 'https://back-tunisiamed.onrender.com/api/quote-responses';

  constructor(private http: HttpClient) {}

  getResponsesByClinic(clinicId: number, status?: string): Observable<QuoteResponse[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<QuoteResponse[]>(`${this.API_URL}/clinic/${clinicId}`, { params });
  }

  createResponse(response: CreateQuoteResponse): Observable<QuoteResponse> {
    return this.http.post<QuoteResponse>(this.API_URL, response);
  }
}
