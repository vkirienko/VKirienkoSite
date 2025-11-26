import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoggingService } from './core/services/logging.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterOutlet]
})
export class AppComponent {
  constructor(private loggingService: LoggingService) {
    this.loggingService.logEvent('Session started');
  }
}
