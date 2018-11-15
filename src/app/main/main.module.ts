import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRouter } from './main.router';
// import { DiscountsModule } from '@app/discounts/discounts.module';
// import { MenuCardModule } from '@app/menu-card/menu-card.module';
// import { ReservationsModule } from '@app/reservations/reservations.module';
// import { SettingsModule } from '@app/settings/settings.module';
// import { SurveysModule } from '@app/surveys/surveys.module';

@NgModule({
  imports: [
    CommonModule,
    MainRouter,
    // DiscountsModule,
    // MenuCardModule,
    // ReservationsModule,
    // SettingsModule,
    // SurveysModule,
  ],
})
export class MainModule {}
