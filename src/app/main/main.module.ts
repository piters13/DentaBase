import { ScheduleModule } from './../schedule/schedule.module';
import { PrescriptionModule } from './../prescription/prescription.module';
import { PatientsModule } from './../patients/patients.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRouter } from './main.router';
import { AppointmentsModule } from '@app/appointments/appointments.module';
import { SettingsModule } from '@app/settings/settings.module';
@NgModule({
  imports: [
    CommonModule,
    MainRouter,
    PatientsModule,
    PrescriptionModule,
    AppointmentsModule,
    SettingsModule,
    ScheduleModule
  ],
})
export class MainModule {}
