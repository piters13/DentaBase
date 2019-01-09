import { PatientsService } from './../../../core/services/patients.service';
import { Patient } from './../../../core/models/patient';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, debounceTime, switchMap } from 'rxjs/operators';
@Component({
  selector: 'db-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit {
  filteredOptions: Observable<Patient[]>;
  patientsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private patientsService: PatientsService) {}

  ngOnInit() {

    this.patientsForm = this.formBuilder.group({
      patientInput: null
    });

    this.filteredOptions = this.patientsForm.get('patientInput').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.patientsService.getPatients()
          .pipe(
            map(patients => patients.filter(patient => patient.lastname.toLowerCase().includes(value) || patient.lastname.includes(value)))
          )
        )
      );
  }

  displayFn(patient: Patient) {
    if (patient) { return patient.lastname; }
  }
}
