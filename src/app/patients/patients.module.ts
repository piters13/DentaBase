import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { PatientsState } from './state/patients.state';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsLayoutComponent } from './layouts/patients-layout/patients-layout.component';
import { SharedModule } from '@app/shared/shared.module';
import { PatientsRouter } from './patients.router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PatientProfileLayoutComponent } from './layouts/patient-profile-layout/patient-profile-layout.component';
import { PatientsListItemComponent } from './components/patients-list-item/patients-list-item.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientCardComponent } from './components/patient-card/patient-card.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxsModule.forFeature([PatientsState]),
    PatientsRouter
  ],
  exports: [PatientsLayoutComponent, PatientProfileLayoutComponent],
  declarations: [
    PatientsLayoutComponent,
    SearchBarComponent,
    PatientProfileLayoutComponent,
    PatientsListItemComponent,
    PatientFormComponent,
    PatientCardComponent]
})
export class PatientsModule { }
