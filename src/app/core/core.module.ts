import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ErrorInterceptor } from '@app/core/interceptors/error.interceptor';
// import { LanguageInterceptor } from '@app/core/interceptors/language.interceptor';
// import { AuthTokenInterceptor } from '@app/core/interceptors/auth-token.interceptor';
// import { NgxsModule } from '@ngxs/store';
// import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
// import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
// import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
// import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
// import { AuthState } from '@app/core/state/auth/auth.state';
// import { environment } from '@env/environment.test';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
// import { deserialize } from '@app/core/ngxs-storage-sync';
// import { RefreshTokenInterceptor } from '@app/core/interceptors/refresh-token.interceptor';

const snackBarOptions = {
  duration: 2000,
  verticalPosition: 'top',
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    // NgxsModule.forRoot([AuthState]),
    // NgxsStoragePluginModule.forRoot({
    //   key: ['auth.userContext', 'auth.credentials'],
    //   deserialize,
    // }),
    // NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    // NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    // NgxsRouterPluginModule.forRoot(),
  ],
  declarations: [],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: snackBarOptions,
    },
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
