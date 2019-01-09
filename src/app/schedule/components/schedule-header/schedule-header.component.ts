import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'db-schedule-header',
  templateUrl: './schedule-header.component.html',
  styleUrls: ['./schedule-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleHeaderComponent {

  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale = 'pl';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

}
