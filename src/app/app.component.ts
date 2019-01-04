import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

const icons: string[] = ['menu', 'arrow_left', 'arrow_right', 'plus', 'remove', 'edit', 'person'];

@Component({
  selector: 'db-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {
    this.registerIcons();
  }

  private registerIcons() {
    const makeIconPath = (icon: string) => `/assets/icons/${icon}.svg`;
    icons.forEach(i =>
      this.iconRegistry.addSvgIcon(
        i,
        this.sanitizer.bypassSecurityTrustResourceUrl(makeIconPath(i)),
      ),
    );
  }
}
