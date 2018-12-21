import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '@app/core/state/auth.state';
import { first, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  @Select(AuthState.isLogged)
  isLogged$: Observable<boolean>;

  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.isAuthorized$();
  }

  canLoad(): Observable<boolean> {
    return this.isAuthorized$();
  }

  private isAuthorized$(): Observable<boolean> {
    return this.isLogged$.pipe(
      first(),
      tap(isLogged => (!isLogged ? this.store.dispatch(new Navigate(['/login'])) : null)),
    );
  }
}
