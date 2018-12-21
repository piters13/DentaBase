import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { makeEqualToValidator } from '@app/core/validators';
import { markAsTouchedDeep } from '@app/core/utils';
import { omit } from 'ramda';
import { UserDetailsFormGroupComponent } from '@app/shared/components/user-details-form-group/user-details-form-group.component';
import { Either } from 'fp-ts/lib/Either';

@Component({
  selector: 'db-register-layout',
  templateUrl: './register-layout.component.html',
  styleUrls: ['./register-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterLayoutComponent implements OnInit {
  loginDetailsForm: FormGroup;
  userDetailsForm: FormGroup;
  loading = false;
  registerParams: Either<string, { token: string; email: string }>;

  @ViewChild(UserDetailsFormGroupComponent)
  private userDetailsFormGroupComponent: UserDetailsFormGroupComponent;

  get emailFormControl(): FormControl {
    return this.loginDetailsForm.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.loginDetailsForm.get('password') as FormControl;
  }

  get passwordConfirmFormControl(): FormControl {
    return this.loginDetailsForm.get('passwordConfirm') as FormControl;
  }

  get termsAcceptedFormControl(): FormControl {
    return this.loginDetailsForm.get('termsAccepted') as FormControl;
  }

  get registrationDataProcessingFormControl(): FormControl {
    return this.loginDetailsForm.get('registrationDataProcessing') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.registerParams = this.route.snapshot.data.params;

    const email = this.registerParams.map(x => x.email).getOrElse(undefined);

    this.loginDetailsForm = this.formBuilder.group({
      email: [email, [Validators.email, Validators.required]],
      password: [undefined, Validators.required],
      passwordConfirm: [undefined, [Validators.required, makeEqualToValidator('password')]],
      termsAccepted: [undefined, Validators.requiredTrue],
      registrationDataProcessing: [undefined, Validators.requiredTrue],
    });

    this.userDetailsForm = this.formBuilder.group(UserDetailsFormGroupComponent.formSchema);
  }

  revalidatePasswordConfirm() {
    this.passwordConfirmFormControl.updateValueAndValidity();
    this.changeDetectorRef.detectChanges();
  }

  saveLoginDetailsForm() {
    this.termsAcceptedFormControl.markAsDirty();
    this.registrationDataProcessingFormControl.markAsDirty();
  }

  validateUserDetailsForm() {
    markAsTouchedDeep(this.userDetailsForm);
    this.userDetailsFormGroupComponent.detectChanges();
  }

  register() {
    this.validateUserDetailsForm();

    if (this.loginDetailsForm.valid && this.userDetailsForm.valid) {
      this.loading = true;
      this.changeDetectorRef.markForCheck();

      const token = this.registerParams.map(x => x.token).getOrElse('');

      this.auth
        .register$(
          {
            ...omit(['passwordConfirm'], this.loginDetailsForm.value),
            ...this.userDetailsForm.value,
          },
          token,
        )
        .subscribe(
          () => {
            this.snackBar.open('Rejestracja zakończona sukcesem. Możesz się zalogować.', null, {
              duration: 7000,
            });
            this.router.navigateByUrl('/login');
          },
          () => {
            this.loading = false;
            this.changeDetectorRef.markForCheck();
          },
        );
    }
  }
}
