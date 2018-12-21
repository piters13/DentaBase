import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'db-page-title',
  template: `
    <h1 class="mat-h1 text-center text-md-left mb-5"><ng-content></ng-content></h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitleComponent {}
