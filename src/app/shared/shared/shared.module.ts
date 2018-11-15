import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule,
  MatInputModule,
  MatStepperModule } from '@angular/material';

const materialModules = [
  ReactiveFormsModule,
  MatIconModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule,
  MatInputModule,
  MatStepperModule,
];


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...materialModules],
  declarations: [],
  exports: [...materialModules],

})
export class SharedModule { }
