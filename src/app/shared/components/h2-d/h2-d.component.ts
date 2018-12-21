import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'db-h2-d',
  template: `
    <h2 class="mat-h2 text-center text-md-left mb-2"><ng-content></ng-content></h2>
    <mat-divider class="mb-3"></mat-divider>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H2DComponent {}
