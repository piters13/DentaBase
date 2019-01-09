import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '@app/core/state/auth.actions';
import { AuthState } from '@app/core/state/auth.state';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes(environment.serverUrl)) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((res: HttpErrorResponse) => {
        if (res.status === 304 && req.headers.has('If-None-Match')) {
          return of(new HttpResponse({ status: 304 }));
        }

        const isLogged = this.store.selectSnapshot(AuthState.isLogged);
        if (res.status === 401 && isLogged) {
          this.store.dispatch(new Logout()).subscribe(() => {
            this.snackBar.open('Twoja sesja wygasła. Zaloguj się ponownie');
          });
          return throwError(res);
        }

        const errorObject = res.error.errors ? res.error.errors[0] : res.error;
        const errorMessage = errorObject.message
          ? errorObject.message
          : errorObject.error_description;
        if (res.status !== 401) {
          this.snackBar.open('Wystąpił błąd | ' + errorMessage, null, {
            duration: 7000,
            panelClass: 'snack-bar-error',
          });
        }

        return throwError(res);
      }),
    );
  }
}
