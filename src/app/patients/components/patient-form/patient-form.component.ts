import { Patient } from '@app/core/models/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'db-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientFormComponent implements OnChanges {
  @Input() patient: Patient;
  readonly form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstname: [undefined, Validators.required],
      lastname: [undefined, Validators.required],
      address: [undefined, Validators.required],
      code: [undefined, Validators.required],
      city: [undefined, Validators.required],
      country: [undefined, Validators.required],
      phone: [undefined, Validators.required],
      info: [undefined]
    });
  }

  ngOnChanges() {
    if (this.patient) {
      this.form.patchValue(
        {
          firstname: this.patient.firstname,
          lastname: this.patient.lastname,
          address: this.patient.address,
          code: this.patient.code,
          city: this.patient.city,
          country: this.patient.country,
          phone: this.patient.phone,
          info: this.patient.info
        }
      );
    }
  }

}
