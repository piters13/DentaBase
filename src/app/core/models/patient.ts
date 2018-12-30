export interface Patient {
  id?: number;
  firstname: string;
  lastname: string;
  pesel: number;
  birthDate: string;
  address: string;
  code: string;
  city: string;
  country: string;
  phone: number;
  info?: string;
  registrationDate?: string;
}
