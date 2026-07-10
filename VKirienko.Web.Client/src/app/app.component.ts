import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoggingService } from './core/services/logging.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterOutlet]
})
export class AppComponent {
  constructor(private loggingService: LoggingService) {
    this.loggingService.logEvent('Session started');
  }
}
