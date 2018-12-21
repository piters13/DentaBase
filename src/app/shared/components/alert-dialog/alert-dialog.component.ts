import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'db-confirm-dialog',
  template: `
    <db-dialog-wrapper submitLabel="OK" (confirm)="close()" type="info" title="Ostrzeżenie">
      <p>{{message}}</p>
    </db-dialog-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string,
    private dialogRef: MatDialogRef<AlertDialogComponent>,
  ) {}

  close() {
    this.dialogRef.close(true);
  }
}
