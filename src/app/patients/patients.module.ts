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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxsModule.forFeature([PatientsState]),
    PatientsRouter
  ],
  exports: [PatientsLayoutComponent],
  declarations: [PatientsLayoutComponent, SearchBarComponent, PatientProfileLayoutComponent, PatientsListItemComponent]
})
export class PatientsModule { }
