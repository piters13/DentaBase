import { PatientsService } from './../../../core/services/patients.service';
import { Patient } from './../../../core/models/patient';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'db-patients-layout',
  templateUrl: './patients-layout.component.html',
  styleUrls: ['./patients-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsLayoutComponent implements OnInit {

  patients: Patient[];

  constructor(private patientsService: PatientsService) { }

  ngOnInit() {
    this.patientsService.getPatients().subscribe(patients => {
      this.patients = patients;
      this.patientsService.patientsData = patients;
    });
  }

}
