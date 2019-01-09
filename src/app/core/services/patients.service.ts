import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { serverUrl } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${serverUrl}/patients`);
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${serverUrl}/patients/${id}`);
  }
}
