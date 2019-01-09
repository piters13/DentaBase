import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '@app/core/state/auth.state';
import { first, map, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate, CanLoad {
  @Select(AuthState.isLogged)
  isLogged$: Observable<boolean>;

  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.isGuest$();
  }

  canLoad(): Observable<boolean> {
    return this.isGuest$();
  }

  private isGuest$(): Observable<boolean> {
    return this.isLogged$.pipe(
      first(),
      tap(isLogged => (isLogged ? this.store.dispatch(new Navigate(['/'])) : null)),
      map(x => !x),
    );
  }
}
