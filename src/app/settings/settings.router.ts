import { RouterModule, Routes } from '@angular/router';
import { SettingsLayoutComponent } from '@app/settings/layouts/settings-layout/settings-layout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRouter {}
