import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenav: MatSidenav;

  registerSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  open() {
    this.sidenav.open();
  }
}
