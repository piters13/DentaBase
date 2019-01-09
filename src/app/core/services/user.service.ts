import { createApiPath, hash } from '@app/core/utils';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { evolve } from 'ramda';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  requestResetPassword$(form: { email: string }): Observable<void> {
    return this.http.put<null>(createApiPath('public', 'users', 'password'), form);
  }

  confirmResetPassword$(body: {
    newPassword: string;
    token: string;
  }): Observable<HttpResponse<null>> {
    return this.http.post<null>(
      createApiPath('public', 'users', 'password'),
      evolve({ newPassword: hash }, body),
    );
  }
}
