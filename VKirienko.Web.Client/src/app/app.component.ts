import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { LoggingService } from './core/services/logging.service';

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterOutlet]
})
export class AppComponent {
  constructor(private loggingService: LoggingService, private router: Router) {
    this.loggingService.logEvent('Session started');

    // Manually track page views for Application Insights without Zone.js
    this.router.events
      .pipe(untilDestroyed(this))
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.loggingService.logPageView(undefined, e.urlAfterRedirects);
      });
  }
}
