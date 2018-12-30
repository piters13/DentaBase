import { PatientProfileLayoutComponent } from './layouts/patient-profile-layout/patient-profile-layout.component';
import { PatientsStateResolver } from './services/patients-state.resolver';
import { PatientsLayoutComponent } from './layouts/patients-layout/patients-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: 'patients',
    component: PatientsLayoutComponent,
    // resolve: { state: PatientsStateResolver },
  },
  // {
  //   path: ':id',
  //   component: PatientProfileLayoutComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRouter {}
