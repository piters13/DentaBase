import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Appointment } from '@app/core/models/appointment';
import { PaginatedResponse } from '@app/core/models/paginated-response';
import { AppointmentsService } from '@app/core/services/appointments.service';

@Component({
  selector: 'db-upcoming-appointments-layout',
  templateUrl: './upcoming-appointments-layout.component.html',
  styleUrls: ['./upcoming-appointments-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpcomingAppointmentsLayoutComponent {

  appointmentsGetFn: (
    page: number,
    pageSize?: number,
  ) => Observable<never | PaginatedResponse<Appointment>>;

  constructor(private appointmentService: AppointmentsService) {
    this.appointmentsGetFn = appointmentService.getUpcomingAppointments$.bind(appointmentService);
  }

}
