import { Subject } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, DAYS_OF_WEEK, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { startOfDay, subDays, addDays, endOfMonth, addHours, isSameDay, isSameMonth, endOfDay } from 'date-fns';
import { trackById } from '@app/core/utils';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#99ff99',
    secondary: '#b3ffb3'
  }
};

@Component({
  selector: 'db-schedule-layout',
  templateUrl: './schedule-layout.component.html',
  styleUrls: ['./schedule-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleLayoutComponent {

  view = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Wizytacja',
      color: colors.red,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'Pan Podsiadło',
      color: colors.yellow
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'Sporządzenie raportu',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Pani Malinowska',
      color: colors.green,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  refresh: Subject<any> = new Subject();

  locale = 'pl';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  displayedColumns: string[] = ['title', 'color', 'start', 'end', 'remove'];

  activeDayIsOpen = true;

  trackById = trackById;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

}
