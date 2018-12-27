import { TimespanInputComponent } from './components/timespan-input/timespan-input.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { PageTitleCComponent } from './components/page-title-c/page-title-c.component';
import { H2DCComponent } from './components/h2-d-c/h2-d-c.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { H2DComponent } from './components/h2-d/h2-d.component';
import { UserDetailsFormGroupComponent } from './components/user-details-form-group/user-details-form-group.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PlaintextFieldComponent } from './components/plaintext-field/plaintext-field.component';
import { DialogWrapperComponent } from './components/dialog-wrapper/dialog-wrapper.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule,
  MatTableModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule,
  MatInputModule,
  MatStepperModule,
  MatChipsModule,
  MatAutocompleteModule} from '@angular/material';

const materialModules = [
  ReactiveFormsModule,
  MatIconModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule,
  MatTableModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule,
  MatInputModule,
  MatStepperModule,
  MatChipsModule,
  MatAutocompleteModule
];

const publicDeclarations = [
  ConfirmDialogComponent,
  DialogWrapperComponent,
  PlaintextFieldComponent,
  LoaderComponent,
  UserDetailsFormGroupComponent,
  H2DComponent,
  PageTitleComponent,
  H2DCComponent,
  PageTitleCComponent,
  AlertDialogComponent,
  TimespanInputComponent
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...materialModules],
  declarations: [...publicDeclarations],
  entryComponents: [ConfirmDialogComponent, AlertDialogComponent],
  exports: [...materialModules, ...publicDeclarations],
})
export class SharedModule { }
