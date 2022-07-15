import { Injectable, ErrorHandler } from '@angular/core';

import { LoggingService } from './logging.service';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

  constructor(private loggingService: LoggingService) {
    super();
  }

  override handleError(error: Error) {
    this.loggingService.logException(error); // Manually log exception
  }
}