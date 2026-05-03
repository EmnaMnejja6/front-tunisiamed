export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  experienceYears: number;
  diploma: string;
  biography?: string;
  clinicId: number;
  clinicName?: string;
  specialtyId?: number;
  specialty?: {
    id: number;
    label: string;
    description: string;
    iconUrl?: string;
  };
  _photoFailed?: boolean;
}

export interface CreateDoctorRequest {
  firstName: string;
  lastName: string;
  photoUrl?: string;
  experienceYears: number;
  diploma: string;
  biography?: string;
  clinicId: number;
  specialtyId: number;
}
