export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'CLINIC_ADMIN';
  createdAt?: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}
