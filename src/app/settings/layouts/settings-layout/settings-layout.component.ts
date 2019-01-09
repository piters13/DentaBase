import { AuthState } from './../../../core/state/auth.state';
import { Logout } from './../../../core/state/auth.actions';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'db-settings-layout',
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsLayoutComponent {

  @Select(AuthState.userFullName)
  userName$: Observable<string>;

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
