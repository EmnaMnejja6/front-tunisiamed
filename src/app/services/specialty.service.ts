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

  // Create a new specialty
  createSpecialty(specialty: Omit<Specialty, 'id'>): Observable<Specialty> {
    return this.http.post<Specialty>(this.apiUrl, specialty);
  }

  // Update specialty by ID
  updateSpecialty(id: number, specialty: Omit<Specialty, 'id'>): Observable<Specialty> {
    return this.http.put<Specialty>(`${this.apiUrl}/${id}`, specialty);
  }

  // Delete specialty by ID
  deleteSpecialty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
