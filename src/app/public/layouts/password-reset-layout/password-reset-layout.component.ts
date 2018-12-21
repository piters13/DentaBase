import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'db-password-reset-layout',
  templateUrl: './password-reset-layout.component.html',
  styleUrls: ['./password-reset-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetLayoutComponent implements OnInit {
  formGroup: FormGroup;
  loading = false;
  success = false;

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: [undefined, [Validators.email, Validators.required]],
    });
  }

  resetPassword() {
    if (this.formGroup.valid) {
      this.loading = true;
      this.changeDetectorRef.markForCheck();

      this.userService.requestResetPassword$(this.formGroup.value).subscribe(
        () => {
          this.success = true;
          this.changeDetectorRef.markForCheck();
        },
        () => {
          this.loading = false;
          this.changeDetectorRef.markForCheck();
        },
      );
    }
  }
}
