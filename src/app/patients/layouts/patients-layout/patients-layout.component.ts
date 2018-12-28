import { Observable } from 'rxjs';
import { PatientsService } from './../../../core/services/patients.service';
import { Patient } from './../../../core/models/patient';
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'db-patients-layout',
  templateUrl: './patients-layout.component.html',
  styleUrls: ['./patients-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsLayoutComponent implements OnInit {

  private patients: Observable<Patient[]>;

  constructor(private patientsService: PatientsService) {}

  ngOnInit() {
    this.patients = this.patientsService.getPatients();

    this.patientsService.getPatients().subscribe((patients => {
      this.patientsService.patientsData = patients;
    }));
  }

}
