import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'db-user-details-form-group',
  templateUrl: './user-details-form-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsFormGroupComponent {
  static formSchema = {
    firstName: [undefined, Validators.required],
    lastName: [undefined, Validators.required],
  };

  @Input()
  form: FormGroup;

  @Input()
  user;

  get firstNameFormControl(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  get lastNameFormControl(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  detectChanges() {
    this.changeDetectorRef.detectChanges();
  }
}
