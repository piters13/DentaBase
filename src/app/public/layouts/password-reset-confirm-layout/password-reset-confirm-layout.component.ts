import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { makeEqualToValidator } from '@app/core/validators';
import { UserService } from '@app/core/services/user.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'db-password-reset-confirm-layout',
  templateUrl: './password-reset-confirm-layout.component.html',
  styleUrls: ['./password-reset-confirm-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetConfirmLayoutComponent implements OnInit {
  formGroup: FormGroup;
  loading = false;

  get newPasswordFormControl(): FormControl {
    return this.formGroup.get('newPassword') as FormControl;
  }

  get newPasswordConfirmFormControl(): FormControl {
    return this.formGroup.get('newPasswordConfirm') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      token: [undefined, Validators.required],
      newPassword: [undefined, Validators.required],
      newPasswordConfirm: [undefined, [Validators.required, makeEqualToValidator('newPassword')]],
    });

    this.formGroup.patchValue(this.route.snapshot.params);
  }

  revalidatePasswordConfirm() {
    this.newPasswordConfirmFormControl.updateValueAndValidity();
    this.changeDetectorRef.detectChanges();
  }

  changePassword() {
    if (this.formGroup.valid) {
      this.loading = true;
      this.changeDetectorRef.markForCheck();

      this.userService
        .confirmResetPassword$({
          token: this.formGroup.value.token,
          newPassword: this.formGroup.value.newPassword,
        })
        .subscribe(
          () => {
            this.snackBar.open(
              'Hasło do Twojego konta zostało zmienione. Możesz się teraz zalogować.',
              null,
              {
                duration: 7000,
                verticalPosition: 'top',
              },
            );

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
