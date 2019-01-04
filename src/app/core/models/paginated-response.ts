import { Appointment } from './appointment';
export interface PaginatedResponse<T> {
  items: Array<T>;
  hasNext: boolean;
}
