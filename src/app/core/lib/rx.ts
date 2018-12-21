import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { StateContext } from '@ngxs/store';
import { pipe } from 'ramda';

export const dispatch = <C, T>(
  successActionFactory: (o: T) => any,
  errorActionFactory: (err: any) => any,
  ctx: StateContext<C>,
) => (source: Observable<T>) =>
  source.pipe(
    switchMap(
      pipe(
        successActionFactory,
        ctx.dispatch,
      ),
    ),
    catchError(err => {
      ctx.dispatch(errorActionFactory(err));
      return throwError(err);
    }),
  );
