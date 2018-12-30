import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'db-patient-profile-layout',
  templateUrl: './patient-profile-layout.component.html',
  styleUrls: ['./patient-profile-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientProfileLayoutComponent implements OnInit {

  readonly form: FormGroup;
  panelOpenState = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({

    });
  }

  ngOnInit() {
  }
}
