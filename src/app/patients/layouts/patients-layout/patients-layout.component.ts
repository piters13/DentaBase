import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'db-patients-layout',
  templateUrl: './patients-layout.component.html',
  styleUrls: ['./patients-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
