import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleRouter } from './schedule.router';
import { ScheduleLayoutComponent } from './layouts/schedule-layout/schedule-layout.component';
import { FormsModule } from '@angular/forms';
import { ScheduleHeaderComponent } from './components/schedule-header/schedule-header.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ScheduleRouter,
    FormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [ScheduleLayoutComponent, ScheduleHeaderComponent],
  exports: [ScheduleLayoutComponent, ScheduleHeaderComponent]
})
export class ScheduleModule { }
