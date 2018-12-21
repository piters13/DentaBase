import { AppointmentsHistoryLayoutComponent } from './layouts/appointments-history-layout/appointments-history-layout.component';
import { UpcomingAppointmentsLayoutComponent } from './layouts/upcoming-appointments-layout/upcoming-appointments-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: 'appointments',
    component: UpcomingAppointmentsLayoutComponent,
  },
  {
    path: 'appointments-history',
    component: AppointmentsHistoryLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRouter {}
