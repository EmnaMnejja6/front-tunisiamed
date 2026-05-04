import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuoteRequest {
  id: number;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  country: string;
  dateofBirth: Date;
  description: string;
  status: string;
  token: string;
  createdAt: Date;
  specialty?: {
    id: number;
    label: string;
    description: string;
    iconUrl?: string;
  };
}

export interface CreateQuoteRequest {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  country: string;
  dateofBirth: string;
  description: string;
  specialtyId: number;
  clinicId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteRequestService {
  private readonly API_URL = 'https://back-tunisiamed.onrender.com/api/quote-requests';

  constructor(private http: HttpClient) {}

  getQuoteRequests(status?: string): Observable<QuoteRequest[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<QuoteRequest[]>(this.API_URL, { params });
  }

  getQuoteRequestById(id: number): Observable<QuoteRequest> {
    return this.http.get<QuoteRequest>(`${this.API_URL}/${id}`);
  }

  createQuoteRequest(request: CreateQuoteRequest): Observable<QuoteRequest> {
    return this.http.post<QuoteRequest>(this.API_URL, request);
  }
}
