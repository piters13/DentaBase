import { pipe } from 'ramda';
import { Option, none, some } from 'fp-ts/lib/Option';
import { Appointment } from '@app/core/models/appointment';
import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { takeUntil, map, tap, switchMap } from 'rxjs/operators';
import { PaginatedResponse } from '@app/core/models/paginated-response';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { trackById } from '@app/core/utils';

@Component({
  selector: 'db-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentsListComponent implements OnInit {
  @Input()
  appointmentsGetFn: (
    page: number,
    pageSize?: number,
  ) => Observable<never | PaginatedResponse<Appointment>>;

  appointments: ReadonlyArray<Appointment>;
  appointmentsCache: { [page: number]: ReadonlyArray<Appointment> } = {};
  trackById = trackById;

  currentPage$ = new BehaviorSubject(1);
  lastPage$: BehaviorSubject<Option<number>> = new BehaviorSubject(none);

  isFirstPage$: Observable<boolean>;
  isLastPage$: Observable<boolean>;
  loading$ = new BehaviorSubject(true);

  private ngUnsubscribe$ = new Subject();

  constructor(private changeDetectionRef: ChangeDetectorRef) {
    this.isFirstPage$ = this.currentPage$.pipe(map(x => x === 1));
    this.isLastPage$ = combineLatest(this.currentPage$, this.lastPage$).pipe(
      map(([currentPage, lastPage]) => currentPage === lastPage.toUndefined()),
    );
  }

  ngOnInit() {
    this.currentPage$
      .pipe(
        tap(() => this.loading$.next(true)),
        switchMap(page => {
          if (this.appointmentsCache.hasOwnProperty(page)) {
            return of(this.appointmentsCache[page]);
          }

          return this.appointmentsGetFn(page).pipe(
            tap(response => {
              if (!response.hasNext) {
                this.lastPage$.next(some(page));
              }
            }),
            map(response => response.items),
            tap(
              appointments =>
                (this.appointmentsCache = { ...this.appointmentsCache, [page]: appointments }),
            ),
          );
        }),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(appointments => {
        this.appointments = appointments;
        this.loading$.next(false);
        this.changeDetectionRef.markForCheck();
      });
  }

  previousPage() {
    const current = this.currentPage$.getValue();
    if (current !== 1) {
      this.currentPage$.next(current - 1);
    }
  }

  nextPage() {
    const current = this.currentPage$.getValue();
    if (current !== this.lastPage$.getValue().toUndefined()) {
      this.currentPage$.next(current + 1);
    }
  }

}
