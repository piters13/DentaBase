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

const errorBlacklist: { urlRegex: RegExp; statusList: number[] }[] = [
  { urlRegex: /restaurants\/[0-9]*\/menu$/, statusList: [404] },
  { urlRegex: /restaurants\/[0-9]*\/user-discounts-reservations$/, statusList: [404] },
  { urlRegex: /restaurants\/[0-9]*\/surveys\/[0-9]*\/result$/, statusList: [404] },
];

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

        const isManuallyHandled = errorBlacklist.find(
          x => x.urlRegex.test(req.url) && x.statusList.includes(res.status),
        );
        if (isManuallyHandled) {
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
