import { SettingsRouter } from './settings.router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SettingsRouter
  ],
  exports: [SettingsLayoutComponent],
  declarations: [SettingsLayoutComponent]
})
export class SettingsModule { }
