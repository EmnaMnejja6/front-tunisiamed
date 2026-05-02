import { Specialty }from "./specialty.model";
import { Doctor } from "./doctor.model";

export interface Clinic {
  id: number;

  name: string;
  description: string;

  city: string;
  latitude: number;
  longitude: number;

  phone: string;
  email: string;
  rating: number;

  imageUrl: string;
  clinicAdminId: number;
  clinicAdminName: string;

  createdAt: Date;
  specialties: Specialty[];
  address: string;
  doctors: Doctor[];
}
