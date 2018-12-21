import { Injectable, OnDestroy } from '@angular/core';
import { asapScheduler, EMPTY, Observable, ReplaySubject, Subject } from 'rxjs';
import { OAuthCredentials } from '@app/core/models/user/o-auth-credentials';
import { AuthService } from '@app/core/services/auth.service';
import { Select, Store } from '@ngxs/store';
import { none, Option, some } from 'fp-ts/lib/Option';
import { AuthState } from '@app/core/state/auth.state';
import {
  catchError,
  distinctUntilChanged,
  filter,
  first,
  map,
  observeOn,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { SetRefreshedCredentials } from '@app/core/state/auth.actions';
import { Either, left, right } from 'fp-ts/lib/Either';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService implements OnDestroy {
  private tokenStream$ = new Subject<string>();
  private refreshStream$ = new ReplaySubject<Option<Either<HttpErrorResponse, OAuthCredentials>>>(
    1,
  );

  @Select(AuthState.refreshToken)
  private _refreshToken$: Observable<Option<string>>;

  constructor(private store: Store, private auth: AuthService) {
    this.refreshStream$.next(none);

    this.tokenStream$
      .pipe(
        distinctUntilChanged(),
        tap(() => this.refreshStream$.next(none)),
        withLatestFrom(this._refreshToken$),
        observeOn(asapScheduler),
        switchMap(([_, optRefreshToken]) =>
          this.auth.requestNewToken$(optRefreshToken.getOrElse('')).pipe(
            tap(oAuthCredentials => {
              this.store.dispatch(new SetRefreshedCredentials(oAuthCredentials));
              this.refreshStream$.next(some(right(oAuthCredentials)));
            }),
            catchError(error => {
              this.refreshStream$.next(some(left(error)));
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe();
  }

  refreshToken$(currentToken: string): Observable<Either<HttpErrorResponse, OAuthCredentials>> {
    this.tokenStream$.next(currentToken);
    return this.refreshStream$.pipe(
      filter(x => x.isSome()),
      map(x => x.toNullable()),
      first(),
    );
  }

  ngOnDestroy() {
    this.tokenStream$.complete();
    this.refreshStream$.complete();
  }
}
