import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

export interface NavigationItem {
  label: string;
  path?: string;
  icon?: string;
  callback?: () => void;
}

@Component({
  selector: 'db-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationItemComponent {

  @Input() item: NavigationItem;

}
