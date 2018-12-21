import { PerscriptionRouter } from './prescription.router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionLayoutComponent } from './layouts/prescription-layout/prescription-layout.component';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PerscriptionRouter
  ],
  exports: [PrescriptionLayoutComponent],
  declarations: [PrescriptionLayoutComponent]
})
export class PrescriptionModule { }
