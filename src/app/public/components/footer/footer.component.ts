import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'db-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
