import { AuthStateModel } from './auth.state';
import { AuthService } from '../services/auth.service';
import { getUserFullName, UserContext } from '../models/user/user-context';
import { OAuthCredentials } from '../models/user/o-auth-credentials';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { none, Option, some } from 'fp-ts/lib/Option';
import {
  GetUserContext,
  GetUserContextError,
  GetUserContextSuccess,
  Login,
  LoginError,
  LoginSuccess,
  Logout,
} from './auth.actions';
import { Navigate } from '@ngxs/router-plugin';
import { dispatch } from '@app/core/lib/rx';

export interface AuthStateModel {
  userContext: Option<UserContext>;
  credentials: Option<OAuthCredentials>;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    userContext: none,
    credentials: none,
  },
})
export class AuthState {
  @Selector()
  static isLogged(state: AuthStateModel): boolean {
    return state.userContext.isSome();
  }

  @Selector()
  static accessToken(state: AuthStateModel): Option<string> {
    return state.credentials.map(credentials => credentials.access_token);
  }

  @Selector()
  static userContext(state: AuthStateModel): Option<UserContext> {
    return state.userContext;
  }

  @Selector()
  static userId(state: AuthStateModel): Option<number> {
    return state.userContext.map(user => user.id);
  }

  @Selector()
  static userFullName(state: AuthStateModel): string {
    return state.userContext.map(getUserFullName).getOrElse(undefined);
  }

  constructor(private authService: AuthService) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.setState({
      userContext: none,
      credentials: none,
    });

    return this.authService
      .login$(action.credentials)
      .pipe(
        dispatch(
          oAuthCredentials => new LoginSuccess(oAuthCredentials),
          err => new LoginError(err),
          ctx,
        ),
      );
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    ctx.patchState({
      credentials: some(action.oAuthCredentials),
    });

    return ctx.dispatch(new GetUserContext());
  }

  @Action(GetUserContext)
  getUserContext(ctx: StateContext<AuthStateModel>) {
    return this.authService
      .getLoggedUserContext$()
      .pipe(
        dispatch(
          userContext => new GetUserContextSuccess(userContext),
          err => new GetUserContextError(err),
          ctx,
        ),
      );
  }

  @Action(GetUserContextSuccess)
  getUserContextSuccess(ctx: StateContext<AuthStateModel>, action: GetUserContextSuccess) {
    ctx.patchState({
      userContext: some(action.userContext),
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      userContext: none,
      credentials: none,
    });

    ctx.dispatch(new Navigate(['/login']));
  }
}
