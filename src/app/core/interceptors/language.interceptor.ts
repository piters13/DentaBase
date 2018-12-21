import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.appendLanguageHeader(req));
  }

  private appendLanguageHeader(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        'Accept-Language': 'pl-PL',
      },
    });
  }
}
