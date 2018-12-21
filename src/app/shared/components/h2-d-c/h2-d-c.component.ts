import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'db-h2-d-c',
  templateUrl: './h2-d-c.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H2DCComponent {
  @Input()
  title: string;
}
