import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, CreateDoctorRequest } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly API_URL = 'https://back-tunisiamed.onrender.com/api/doctors';

  constructor(private http: HttpClient) {}

  getDoctors(clinicId?: number, specialtyId?: number): Observable<Doctor[]> {
    let params = new HttpParams();
    if (clinicId) params = params.set('clinicId', clinicId.toString());
    if (specialtyId) params = params.set('specialtyId', specialtyId.toString());
    return this.http.get<Doctor[]>(this.API_URL, { params });
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.API_URL}/${id}`);
  }

  createDoctor(doctor: CreateDoctorRequest): Observable<Doctor> {
    return this.http.post<Doctor>(this.API_URL, doctor);
  }

  updateDoctor(id: number, doctor: CreateDoctorRequest): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.API_URL}/${id}`, doctor);
  }

  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
