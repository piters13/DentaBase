import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patientUrl = 'http://localhost:3003/patients';

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientUrl);
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(this.patientUrl + '/' + id);
  }
}
