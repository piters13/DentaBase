// tslint:disable-next-line:max-line-length
import { PasswordResetConfirmLayoutComponent } from './public/layouts/password-reset-confirm-layout/password-reset-confirm-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LoginLayoutComponent } from './public/layouts/login-layout/login-layout.component';
import { PasswordResetLayoutComponent } from './public/layouts/password-reset-layout/password-reset-layout.component';
import { RegisterLayoutComponent } from './public/layouts/register-layout/register-layout.component';
import { AppDashboardComponent } from './public/components/app-dashboard/app-dashboard.component';
import { AppRouter } from './app.router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NavigationItemComponent } from './public/components/navigation-item/navigation-item.component';
import { AppBarComponent } from './public/components/app-bar/app-bar.component';
import { FooterComponent } from './public/components/footer/footer.component';
import { SidenavContentComponent } from './public/components/sidenav-content/sidenav-content.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';

registerLocaleData(localePl, 'pl', localePlExtra);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    SharedModule,
    AppRouter,
    LayoutModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [
    AppBarComponent,
    AppComponent,
    AppDashboardComponent,
    FooterComponent,
    NavigationItemComponent,
    SidenavContentComponent,
    AppBarComponent,
    LoginLayoutComponent,
    RegisterLayoutComponent,
    PasswordResetLayoutComponent,
    PasswordResetConfirmLayoutComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
