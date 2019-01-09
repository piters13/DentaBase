import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Appointment } from './../models/appointment';
import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../models/paginated-response';
import { serverUrl } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) {}

  getUpcomingAppointments$(
    page: number,
    pageSize: number = 5,
  ): Observable<never | PaginatedResponse<Appointment>> {
    return this.http
      .get<Appointment[]>(`${serverUrl}/upcoming-appointments`, {
          params: { _page: page.toString(), _limit: pageSize.toString() },
          observe: 'response',
        })
        .pipe(
          map(res => ({
            items: res.body,
            hasNext: !!res.headers.get('Link'),
          })),
          catchError(
            (err: HttpErrorResponse) =>
              err.status === 404
                ? of({
                    items: [],
                    hasNext: false,
                  })
                : throwError(err),
          ),
        );
  }

  getAppointmentsHistory$(
    page: number,
    pageSize: number = 5,
  ): Observable<never | PaginatedResponse<Appointment>> {
    return this.http
      .get<Appointment[]>(`${serverUrl}/appointments-history`, {
          params: { _page: page.toString(), _limit: pageSize.toString() },
          observe: 'response',
        })
        .pipe(
          map(res => ({
            items: res.body,
            hasNext: !!res.headers.get('Link'),
          })),
          catchError(
            (err: HttpErrorResponse) =>
              err.status === 404
                ? of({
                    items: [],
                    hasNext: false,
                  })
                : throwError(err),
          ),
        );
  }
}
