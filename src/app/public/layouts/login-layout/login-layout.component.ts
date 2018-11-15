import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Select, Store } from '@ngxs/store';
// import { AuthState } from '@app/core/state/auth/auth.state';
import { Observable } from 'rxjs';
// import { Login } from '@app/core/state/auth/auth.actions';
import { Router } from '@angular/router';
// import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'db-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayoutComponent implements OnInit {
  formGroup: FormGroup;

  // @Select(AuthState.loading)
  loading: Observable<boolean>;

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  constructor(private formBuilder: FormBuilder,
            //  private store: Store
            ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
    });
  }

  login() {
    // if (this.formGroup.valid) {
    //   this.store.dispatch(new Login(this.formGroup.value));
    // }
  }
}

