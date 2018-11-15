import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import { AuthService } from '@app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { makeEqualToValidator } from 'src/app/core/validators';
import { omit } from 'ramda';
// import { UserDetailsFormGroupComponent } from '@app/shared/components/user-details-form-group/user-details-form-group.component';
import { markAsTouchedDeep } from 'src/app/core/utils';

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
  registerParams = { token: 'xD' };

  // @ViewChild(UserDetailsFormGroupComponent)
  // private userDetailsFormGroupComponent: UserDetailsFormGroupComponent;

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
    // private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // this.registerParams = this.route.snapshot.data.registerParams;

    this.loginDetailsForm = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.required],
        // this.auth.validateEmailAvailability$.bind(this.auth),
      ],
      password: [null, Validators.required],
      passwordConfirm: [null, [Validators.required, makeEqualToValidator('password')]],
      termsAccepted: [false, Validators.requiredTrue],
      registrationDataProcessing: [false, Validators.requiredTrue],
    });

    // this.userDetailsForm = this.formBuilder.group(UserDetailsFormGroupComponent.formSchema);
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
    // this.userDetailsFormGroupComponent.detectChanges();
  }

  register() {
    this.validateUserDetailsForm();

    if (this.loginDetailsForm.valid && this.userDetailsForm.valid) {
      this.loading = true;
      this.changeDetectorRef.markForCheck();

      // this.auth
      //   .register$(
      //     {
      //       ...omit(['passwordConfirm'], this.loginDetailsForm.value),
      //       ...this.userDetailsForm.value,
      //     },
      //     this.registerParams.token,
      //   )
      //   .subscribe(
      //     () => {
      //       this.snackBar.open('Rejestracja zakończona sukcesem. Możesz się zalogować.', null, {
      //         duration: 7000,
      //       });
      //       this.router.navigateByUrl('/login');
      //     },
      //     () => {
      //       this.loading = false;
      //       this.changeDetectorRef.markForCheck();
      //     },
      //   );
    }
  }
}
