import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { filter, takeUntil } from 'rxjs/operators';

export interface Timespan {
  startHours: string;
  stopHours: string;
}

let nextId = 0;

@Component({
  selector: 'db-timespan-input',
  templateUrl: './timespan-input.component.html',
  styleUrls: ['./timespan-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: forwardRef(() => TimespanInputComponent) },
  ],
})
export class TimespanInputComponent
  implements ControlValueAccessor, MatFormFieldControl<Timespan>, OnInit, OnDestroy {
  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'timespan-input';

  @HostBinding('id')
  id = `timespan-input-${nextId++}`;

  @HostBinding('attr.aria-describedby')
  describedBy = '';
  placeholder = '';
  touched = false;

  get empty() {
    const { startHour, startMinutes, stopHour, stopMinutes } = this.parts.value;

    return !startHour && !startMinutes && !stopHour && !stopMinutes;
  }

  @HostBinding('class.label-floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): Timespan | null {
    const { startHour, startMinutes, stopHour, stopMinutes } = this.parts.value;
    if (
      this.isValidTime(startHour, startMinutes) &&
      this.isValidTime(stopHour, stopMinutes) &&
      this.isStopAfterStart(startHour, startMinutes, stopHour, stopMinutes)
    ) {
      return {
        startHours: `${startHour}:${startMinutes}`,
        stopHours: `${stopHour}:${stopMinutes}`,
      };
    }
    return null;
  }
  set value(timespan: Timespan | null) {
    if (!timespan) {
      this.parts.setValue({
        startHour: null,
        startMinutes: null,
        stopHour: null,
        stopMinutes: null,
      });
    } else {
      const start = timespan.startHours.split(':');
      const stop = timespan.stopHours.split(':');
      this.parts.setValue({
        startHour: start[0],
        startMinutes: start[1],
        stopHour: stop[0],
        stopMinutes: stop[1],
      });
    }

    this.stateChanges.next();
  }

  get hoursPlaceholder(): string {
    return this.shouldLabelFloat ? 'HH' : '';
  }

  get minutesPlaceholder(): string {
    return this.shouldLabelFloat ? 'MM' : '';
  }

  private ngUnsubscribe$ = new Subject();

  constructor(
    formBuilder: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    @Optional()
    @Self()
    public ngControl: NgControl,
  ) {
    this.parts = formBuilder.group({
      startHour: undefined,
      startMinutes: undefined,
      stopHour: undefined,
      stopMinutes: undefined,
    });

    fm.monitor(elRef, true).subscribe(origin => {
      this.focused = !!origin;

      if (!this.focused && this.ngControl) {
        this.touched = true;
        this.errorState = this.ngControl.status === 'INVALID';
      }

      this.stateChanges.next();
    });

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (obj: any) => null;
  onTouched = () => null;

  ngOnInit() {
    if (this.ngControl) {
      this.ngControl.statusChanges
        .pipe(
          filter(() => this.touched),
          takeUntil(this.ngUnsubscribe$),
        )
        .subscribe(status => (this.errorState = status === 'INVALID'));
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef);
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: Timespan | null): void {
    this.value = obj;
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  private isValidTime(hour: string, minutes: string): boolean {
    return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(`${hour}:${minutes}`);
  }

  private isStopAfterStart(startHour, startMinutes, stopHour, stopMinutes): boolean {
    const start = new Date(0, 0, 0, +startHour, +startMinutes).getTime();
    const stop = new Date(0, 0, 0, +stopHour, +stopMinutes).getTime();

    return stop - start > 0;
  }
}
