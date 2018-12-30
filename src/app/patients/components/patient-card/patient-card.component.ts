import { Patient } from '@app/core/models/patient';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'db-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientCardComponent implements OnInit {
  @Input() patient: Patient;

  constructor() {}

  ngOnInit() {}

}
