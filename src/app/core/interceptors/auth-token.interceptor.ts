import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Select } from '@ngxs/store';
import { AuthState } from '@app/core/state/auth.state';
import { Observable } from 'rxjs';
import { Option } from 'fp-ts/lib/Option';
import { environment } from '@env/environment';
import { first, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  @Select(AuthState.accessToken)
  private accessToken$: Observable<Option<string>>;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes(environment.serverUrl)) {
      return next.handle(req);
    }

    return this.accessToken$.pipe(
      first(),
      map(optToken => optToken.fold(req, token => this.appendAuthHehader(req, token))),
      switchMap(request => next.handle(request)),
    );
  }

  private appendAuthHehader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (req.headers.has('Authorization')) {
      return req;
    } else {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
}
