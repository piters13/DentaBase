import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'db-confirm-dialog',
  template: `
    <db-dialog-wrapper submitLabel="Potwierdź" (confirm)="close()" title="Potwierdź akcję">
      <p>{{message}}</p>
    </db-dialog-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {}

  close() {
    this.dialogRef.close(true);
  }
}
