import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  HostBinding,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { markAsTouchedDeep, updateValueAndValidityDeep } from '@app/core/utils';

@Component({
  selector: 'db-dialog-wrapper',
  templateUrl: './dialog-wrapper.component.html',
  styleUrls: ['./dialog-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogWrapperComponent {
  @Output()
  confirm = new EventEmitter<Event>();

  @Input()
  form: FormGroup;
  @Input()
  disabled: boolean;
  @Input()
  submitLabel = 'Potwierdź';
  @Input()
  cancelLabel = 'Anuluj';
  @Input()
  title: string;
  @Input()
  type: 'action' | 'info' = 'action';
  @Input()
  @HostBinding('class')
  size: 'md' | 'lg' = 'md';

  get isInfo(): boolean {
    return this.type === 'info';
  }

  submit(event: Event) {
    markAsTouchedDeep(this.form);
    updateValueAndValidityDeep(this.form);
    this.confirm.emit(event);
  }

  click(event: Event) {
    this.confirm.emit(event);
  }
}
