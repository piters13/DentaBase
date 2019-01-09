import { Appointment } from '@app/core/models/appointment';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'db-appointments-list-item',
  templateUrl: './appointments-list-item.component.html',
  styleUrls: ['./appointments-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentsListItemComponent {
  @Input()
  appointment: Appointment;
}
