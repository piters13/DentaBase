import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '@app/core/services/patients.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Patient } from '@app/core/models/patient';
import { switchMap, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'db-patient-profile-layout',
  templateUrl: './patient-profile-layout.component.html',
  styleUrls: ['./patient-profile-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientProfileLayoutComponent implements OnInit {
  panelOpenState = false;
  patient$: Observable<Patient>;

  constructor(private patientsService: PatientsService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const patientId$ = this.activatedRoute.params;

    this.patient$ = patientId$.pipe(
      switchMap(({id}) => {
        return this.patientsService.getPatient(id);
      }),
      shareReplay()
    );
  }
}
