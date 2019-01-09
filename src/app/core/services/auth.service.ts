import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginForm } from '@app/core/models/forms/login-form';
import { environment, serverUrl } from '@env/environment';
import { UserContext } from '@app/core/models/user/user-context';
import { User } from '@app/core/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login$(credentials: LoginForm): Observable<any> {
    const body = new HttpParams({
      fromObject: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    return this.http.post<any>(`${environment.oAuthUrl}`, body);
  }

  getLoggedUserContext$(): Observable<UserContext> {
    return this.http.get<UserContext>(`${serverUrl}/users/context`);
  }

  getLoggedUserData$(): Observable<User> {
    return this.http.get<User>(`${serverUrl}/users/context`);
  }

  revokeToken$(token: string): Observable<void> {
    return this.http.post<void>(`${serverUrl}/token/revoke`, { token });
  }
}
