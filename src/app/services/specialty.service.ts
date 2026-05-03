import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialty } from '../models/specialty.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private apiUrl = 'https://back-tunisiamed.onrender.com/api/specialties';

  constructor(private http: HttpClient) {}

  // Get all specialties
  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(this.apiUrl);
  }

  // Get specialty by ID
  getSpecialtyById(id: number): Observable<Specialty> {
    return this.http.get<Specialty>(`${this.apiUrl}/${id}`);
  }
}
