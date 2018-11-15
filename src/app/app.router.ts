// tslint:disable-next-line:max-line-length
import { PasswordResetConfirmLayoutComponent } from './public/layouts/password-reset-confirm-layout/password-reset-confirm-layout.component';
import { PasswordResetLayoutComponent } from './public/layouts/password-reset-layout/password-reset-layout.component';
import { RegisterLayoutComponent } from './public/layouts/register-layout/register-layout.component';
import { LoginLayoutComponent } from './public/layouts/login-layout/login-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginLayoutComponent,
    // canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterLayoutComponent,
    // canActivate: [GuestGuard],
  },
  {
    path: 'password-reset',
    // canActivate: [GuestGuard],
    children: [
      {
        path: '',
        component: PasswordResetLayoutComponent,
      },
      {
        path: ':token',
        component: PasswordResetConfirmLayoutComponent,
      },
    ],
  },
  {
    path: '',
    loadChildren: './main/main.module#MainModule',
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouter {}
