import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
import { Login } from '@app/core/state/auth.actions';
import { Navigate } from '@ngxs/router-plugin';
import { noop } from '@app/core/utils';

@Component({
  selector: 'db-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayoutComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  loading$ = new BehaviorSubject(false);

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: [undefined, [Validators.email, Validators.required]],
      password: [undefined, Validators.required],
    });
  }

  ngOnDestroy() {
    this.loading$.complete();
  }

  login() {
    if (this.formGroup.valid) {
      this.loading$.next(true);
      this.store.dispatch(new Login(this.formGroup.value)).subscribe(
        noop,
        () => {
          this.loading$.next(false);
        },
        () => {
          this.store.dispatch(new Navigate(['/']));
        },
      );
    }
  }
}
