import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrescriptionLayoutComponent } from './layouts/prescription-layout/prescription-layout.component';


const routes: Routes = [
  {
    path: 'prescription',
    component: PrescriptionLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerscriptionRouter {}
