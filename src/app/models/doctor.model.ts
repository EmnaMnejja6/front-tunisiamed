export interface Doctor {
  id: number;
  fname: string;
  photo_url?: string;
  diploma: string;
  experience_years: number;
  biography?: string;
  clinic_id: number;
  specialty_id: number;
  created_at: Date;
}
