import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'db-plaintext-field',
  template: `
    <mat-form-field class="transparent-outline">
      <mat-label>{{label}}</mat-label>
      <input matInput readonly [value]="formattedValue">
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaintextFieldComponent {
  @Input()
  label: string;
  @Input()
  value: string;
  @Input()
  unit: string;
  @Input()
  default: string;

  get formattedValue() {
    return `${this.value || (this.default || '-')}${
      this.unit && this.value ? ' ' + this.unit : ''
    }`;
  }
}
