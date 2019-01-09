import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PaginatedResponse } from '@app/core/models/paginated-response';
import { Appointment } from '@app/core/models/appointment';
import { AppointmentsService } from '@app/core/services/appointments.service';

@Component({
  selector: 'db-appointments-history-layout',
  templateUrl: './appointments-history-layout.component.html',
  styleUrls: ['./appointments-history-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentsHistoryLayoutComponent {

  appointmentsGetFn: (
    page: number,
    pageSize?: number,
  ) => Observable<never | PaginatedResponse<Appointment>>;

  constructor(appointmentService: AppointmentsService) {
    this.appointmentsGetFn = appointmentService.getAppointmentsHistory$.bind(appointmentService);
  }

}
