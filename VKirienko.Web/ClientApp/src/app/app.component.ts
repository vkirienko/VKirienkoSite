import { Component } from '@angular/core';

import { LoggingService } from './core/services/logging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private loggingService: LoggingService) {
    this.loggingService.logEvent('Session started');
  }
}
