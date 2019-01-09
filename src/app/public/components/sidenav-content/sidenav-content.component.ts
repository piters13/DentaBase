import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthState } from './../../../core/state/auth.state';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NavigationItem } from '../navigation-item/navigation-item.component';

@Component({
  selector: 'db-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavContentComponent {

  @Select(AuthState.isLogged)
  isLogged$: Observable<boolean>;

  @Input()
  navigationItems: NavigationItem[] = [];

}
