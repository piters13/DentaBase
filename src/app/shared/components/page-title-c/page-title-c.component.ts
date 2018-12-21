import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'db-page-title-c',
  templateUrl: './page-title-c.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitleCComponent {
  @Input()
  title: string;
}
