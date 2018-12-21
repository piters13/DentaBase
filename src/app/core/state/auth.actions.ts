import { LoginForm } from '../models/forms/login-form';
import { OAuthCredentials } from '../models/user/o-auth-credentials';
import { UserContext } from '../models/user/user-context';

export class Login {
  static readonly type = '[Login Page] Login';

  constructor(readonly credentials: LoginForm) {}
}

export class LoginSuccess {
  static readonly type = '[Auth API] Login success';

  constructor(readonly oAuthCredentials: OAuthCredentials) {}
}

export class LoginError {
  static readonly type = '[Auth API] Login error';

  constructor(readonly error: any) {}
}

export class GetUserContext {
  static readonly type = '[Auth] Get user context';
}

export class GetUserContextSuccess {
  static readonly type = '[Auth API] Get user context success';

  constructor(readonly userContext: UserContext) {}
}

export class GetUserContextError {
  static readonly type = '[Auth API] Get user context error';

  constructor(readonly error: any) {}
}
export class SetRefreshedCredentials {
  static readonly type = '[Refresh Token Process] Set refreshed credentials';

  constructor(readonly oAuthCredentials: OAuthCredentials) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
