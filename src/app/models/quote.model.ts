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

export interface QuoteOffer {
  id: number;
  estimatedPrice: number;
  message: string;
  status: string;
  createdAt: string;
  quoteRequestId: number;
  clinicId: number;
  clinicName: string;
  clinicCity: string;
  clinicEmail: string;
  clinicImageUrl?: string;
  clinicRating?: number;
}
