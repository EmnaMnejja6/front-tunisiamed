import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clinic } from '../models/clinic.model';
@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private apiUrl = 'http://localhost:8081/api/clinics';
    constructor(private http: HttpClient) {}
getClinics(): Observable<Clinic[]> {
  return this.http.get<Clinic[]>(this.apiUrl);
}
getClinicsWithFilters(city?: string, specialtyId?: number, keyword?: string): Observable<Clinic[]> {
  let params: any = {};
  
  if (city) params.city = city;
  if (specialtyId) params.specialtyId = specialtyId.toString();
  if (keyword) params.keyword = keyword;
  
  return this.http.get<Clinic[]>(this.apiUrl, { params });
}
getClinicById(id: number): Observable<Clinic> {
  return this.http.get<Clinic>(`${this.apiUrl}/${id}`);
}

}
