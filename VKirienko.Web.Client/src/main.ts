import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import 'hammerjs';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app-routes';
import { ErrorHandlerService } from './app/core/services/error-handler.service';
import { LoggingService } from './app/core/services/logging.service';
import { SharedModule } from './app/shared/shared.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      SharedModule
    ),
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules)
    ),
    LoggingService
  ]
});
