import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { RefreshTokenService } from '@app/core/services/refresh-token.service';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { AuthState } from '@app/core/state/auth.state';
import { Option } from 'fp-ts/lib/Option';
import { OAuthCredentials } from '@app/core/models/user/o-auth-credentials';
import { identity } from 'ramda';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  @Select(AuthState.accessToken)
  private optAccessToken$: Observable<Option<string>>;

  constructor(private refreshTokenService: RefreshTokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (this.isTokenExpiredError(req, error)) {
          const currentToken = req.headers.get('Authorization');

          return this.refreshToken$(currentToken).pipe(
            switchMap(oAuthCredentials => this.retryRequest$(req, oAuthCredentials, next)),
          );
        }

        return throwError(error);
      }),
    );
  }

  private refreshToken$(accessToken: string): Observable<OAuthCredentials> {
    return this.refreshTokenService.refreshToken$(accessToken).pipe(
      map(eitherCredentials =>
        eitherCredentials.fold(error => {
          throw error;
        }, identity),
      ),
    );
  }

  private retryRequest$(
    initialReq: HttpRequest<any>,
    credentials: OAuthCredentials,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const httpHeaders = initialReq.headers.set(
      'Authorization',
      `Bearer ${credentials.access_token}`,
    );
    return next.handle(initialReq.clone({ headers: httpHeaders }));
  }

  private isTokenExpiredError(req: HttpRequest<any>, error: HttpErrorResponse): boolean {
    return !(req.url === environment.oAuthUrl) && error.status === 401;
  }
}
