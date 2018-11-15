// tslint:disable-next-line:max-line-length
import { PasswordResetConfirmLayoutComponent } from './public/layouts/password-reset-confirm-layout/password-reset-confirm-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './public/layouts/login-layout/login-layout.component';
import { PasswordResetLayoutComponent } from './public/layouts/password-reset-layout/password-reset-layout.component';
import { RegisterLayoutComponent } from './public/layouts/register-layout/register-layout.component';
import { AppDashboardComponent } from './public/components/app-dashboard/app-dashboard.component';
import { AppRouter } from './app.router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    PasswordResetConfirmLayoutComponent,
    PasswordResetLayoutComponent,
    RegisterLayoutComponent,
    AppDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    SharedModule,
    AppRouter
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
