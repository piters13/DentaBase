import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginForm } from '@app/core/models/forms/login-form';
import { buildOAuthHeader, createApiPath, hash } from '@app/core/utils';
import { environment } from '@env/environment';
import { OAuthCredentials } from '@app/core/models/user/o-auth-credentials';
import { UserContext } from '@app/core/models/user/user-context';
import { User } from '@app/core/models/user/user';
import { evolve } from 'ramda';
import { RegisterForm } from '@app/core/models/user/register-form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login$(credentials: LoginForm): Observable<OAuthCredentials> {
    const body = new HttpParams({
      fromObject: {
        grant_type: 'password',
        scope: 'trust',
        username: credentials.email,
        password: hash(credentials.password),
      },
    });

    const headers = buildOAuthHeader();

    return this.http.post<OAuthCredentials>(`${environment.oAuthUrl}/token`, body, { headers });
  }

  register$(form: RegisterForm, registrationToken: string): Observable<User> {
    return this.http.post<User>(
      createApiPath('public', 'users'),
      evolve({ password: hash }, form),
      { headers: { registrationToken } },
    );
  }

  getLoggedUserContext$(): Observable<UserContext> {
    return this.http.get<UserContext>(createApiPath('users', 'context'));
  }

  getLoggedUserData$(): Observable<User> {
    return this.http.get<User>(createApiPath('users', 'me'));
  }

  requestNewToken$(refreshToken: string): Observable<OAuthCredentials> {
    const body = new HttpParams({
      fromObject: {
        grant_type: 'refresh_token',
        scope: 'trust',
        refresh_token: refreshToken,
      },
    });

    const headers = buildOAuthHeader();

    return this.http.post<OAuthCredentials>(`${environment.oAuthUrl}/token`, body, { headers });
  }

  revokeToken$(token: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/token/revoke`, { token });
  }
}
