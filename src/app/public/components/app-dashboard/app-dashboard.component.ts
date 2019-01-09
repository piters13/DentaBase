import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SidenavService } from '@app/core/services/sidenav.service';
import { MatSidenav } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '@app/core/state/auth.state';
import { NavigationItem } from '@app/public/components/navigation-item/navigation-item.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'db-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDashboardComponent implements AfterViewInit {
  @Select(AuthState.isLogged)
  isLogged$: Observable<boolean>;

  @ViewChild(MatSidenav)
  matSidenav;

  navigation$: Observable<NavigationItem[]>;

  constructor(private sidenav: SidenavService, private store: Store) {
    const adminNavigation: NavigationItem[] = [
      {
        label: 'Strona główna',
        path: '/schedule',
      },
      {
        label: 'Wizyty',
        path: '/appointments',
      },
      {
        label: 'Pacjenci',
        path: '/patients',
      },
      // {
      //   label: 'Recepta do druku',
      //   path: '/prescription',
      // },
      {
        label: 'Ustawienia',
        path: '/settings'
      },
    ];

    this.navigation$ = this.isLogged$.pipe(map(isLogged => (isLogged ? adminNavigation : [])));
  }

  ngAfterViewInit() {
    this.sidenav.registerSidenav(this.matSidenav);
  }
}
