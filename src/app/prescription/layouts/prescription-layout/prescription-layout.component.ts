import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'db-prescription-layout',
  templateUrl: './prescription-layout.component.html',
  styleUrls: ['./prescription-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrescriptionLayoutComponent implements OnInit {

  readonly form: FormGroup;
  panelOpenState = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({

    });
  }

  ngOnInit() {
  }

}
