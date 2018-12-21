import { AuthState } from './../../../core/state/auth.state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NavigationItem } from '../navigation-item/navigation-item.component';
import { SidenavService } from '@app/core/services/sidenav.service';

@Component({
  selector: 'db-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBarComponent {

  @Select(AuthState.isLogged)
  isLogged$: Observable<boolean>;

  @Input()
  navigationItems: NavigationItem[] = [];

  constructor(readonly sidenav: SidenavService) {}

}
