export interface Clinic {
  id: number;
  uuid: string;

  name: string;
  description: string;

  city: string;
  latitude: number;
  longitude: number;

  phone: string;
  email: string;
  rating: number;

  image_url: string;
  clinic_admin: string;

  created_at: Date;
}
