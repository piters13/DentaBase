import { Patient } from './patient';

export interface Appointment {
  id?: number;
  timestamp: string;
  patient: Patient;
  description: string;
}
