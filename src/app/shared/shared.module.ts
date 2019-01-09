import { PageTitleCComponent } from './components/page-title-c/page-title-c.component';
import { H2DCComponent } from './components/h2-d-c/h2-d-c.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { H2DComponent } from './components/h2-d/h2-d.component';
import { LoaderComponent } from './components/loader/loader.component';
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
  MatAutocompleteModule,
  MatExpansionModule,
  MatCardModule,
} from '@angular/material';

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
  MatAutocompleteModule,
  MatExpansionModule,
  MatCardModule,
];

const publicDeclarations = [
  LoaderComponent,
  H2DComponent,
  PageTitleComponent,
  H2DCComponent,
  PageTitleCComponent,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...materialModules],
  declarations: [...publicDeclarations],
  exports: [...materialModules, ...publicDeclarations],
})
export class SharedModule { }
