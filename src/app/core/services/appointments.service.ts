import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './../models/appointment';
import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../models/paginated-response';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) {}

  getUpcomingAppointments$(
    page: number,
    pageSize: number = 10,
  ): Observable<never | PaginatedResponse<Appointment>> {
    return this.getAppointments$('FUTURE', new Date().toISOString(), page, pageSize);
  }

  getAppointmentsHistory$(
    page: number,
    pageSize: number = 10,
  ): Observable<never | PaginatedResponse<Appointment>> {
    return this.getAppointments$('PAST', new Date().toISOString(), page, pageSize);
  }

  getAppointments$(
    timeFilter: string,
    timestamp: string,
    page: number,
    pageSize: number = 10,
  ): Observable<never | PaginatedResponse<Appointment>> {
    return;
  }
}
