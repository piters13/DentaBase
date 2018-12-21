import { NgxsModule } from '@ngxs/store';
import { PatientsState } from './state/patients.state';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsLayoutComponent } from './layouts/patients-layout/patients-layout.component';
import { SharedModule } from '@app/shared/shared.module';
import { PatientsRouter } from './patients.router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([PatientsState]),
    PatientsRouter
  ],
  exports: [PatientsLayoutComponent],
  declarations: [PatientsLayoutComponent]
})
export class PatientsModule { }
