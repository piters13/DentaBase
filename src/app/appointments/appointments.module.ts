import { AppointmentsRouter } from './appointments.router';
import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingAppointmentsLayoutComponent } from './layouts/upcoming-appointments-layout/upcoming-appointments-layout.component';
import { AppointmentsHistoryLayoutComponent } from './layouts/appointments-history-layout/appointments-history-layout.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { AppointmentsListItemComponent } from './components/appointments-list-item/appointments-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppointmentsRouter,
  ],
  exports: [UpcomingAppointmentsLayoutComponent, AppointmentsHistoryLayoutComponent],
  declarations: [
    UpcomingAppointmentsLayoutComponent,
    AppointmentsHistoryLayoutComponent,
    AppointmentsListComponent,
    AppointmentsListItemComponent
  ]
})
export class AppointmentsModule { }
