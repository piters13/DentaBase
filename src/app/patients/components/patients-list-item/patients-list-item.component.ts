import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Patient } from '@app/core/models/patient';

@Component({
  selector: 'db-patients-list-item',
  templateUrl: './patients-list-item.component.html',
  styleUrls: ['./patients-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsListItemComponent implements OnInit {

  @Input() patient: Patient;

  constructor() { }

  ngOnInit() {
  }

  getDetailsRoute() {
    return '/patients/' + this.patient.id ;
  }

}
