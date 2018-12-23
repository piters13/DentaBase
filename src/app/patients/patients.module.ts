import { NgxsModule } from '@ngxs/store';
import { PatientsState } from './state/patients.state';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsLayoutComponent } from './layouts/patients-layout/patients-layout.component';
import { SharedModule } from '@app/shared/shared.module';
import { PatientsRouter } from './patients.router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([PatientsState]),
    PatientsRouter
  ],
  exports: [PatientsLayoutComponent],
  declarations: [PatientsLayoutComponent, SearchBarComponent]
})
export class PatientsModule { }
