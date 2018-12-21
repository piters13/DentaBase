import { ListWrapper, wrap } from '../models/list-wrapper';
import { PaginatedResponse } from '@app/core/models/paginated-response';
import { ChangePasswordForm } from '@app/core/models/forms/change-password-form';
import { createApiPath, hash } from '@app/core/utils';
import { User } from './../models/user/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { evolve } from 'ramda';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  list$(params?: any): Observable<PaginatedResponse<User>> {
    return this.http
      .get<ListWrapper<User>>(createApiPath('users'), { params, observe: 'response' })
      .pipe(map(res => ({ items: res.body.items, hasNext: !!res.headers.get('Link') })));
  }

  get$(userId: number): Observable<User> {
    return this.http.get<User>(createApiPath('users', userId));
  }

  delete$(userId: number): Observable<HttpResponse<null>> {
    return this.http.delete<null>(createApiPath('users', userId), {
      observe: 'response',
    });
  }

  invite$(email: string): Observable<HttpResponse<null>> {
    return this.http.post<null>(createApiPath('users', 'registration'), wrap([email]));
  }

  update$(userId: number, user: User): Observable<User> {
    return this.http.put<User>(createApiPath('users', userId), user);
  }

  changePassword$(changePasswordForm: ChangePasswordForm): Observable<void> {
    return this.http.put<null>(
      createApiPath('users', 'password'),
      evolve({ oldPassword: hash, newPassword: hash }, changePasswordForm),
    );
  }

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

  checkRegisterToken$(token: string): Observable<{ email: string }> {
    return this.http.get<{ email: string }>(
      createApiPath('public', 'users', 'registrations', token),
    );
  }
}
