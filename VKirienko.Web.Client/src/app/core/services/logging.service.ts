import { Injectable } from '@angular/core';
import { ApplicationInsights, ICustomProperties } from '@microsoft/applicationinsights-web';

import { environment } from '../../../environments/environment';

@Injectable()
export class LoggingService {
  appInsights: ApplicationInsights;

  constructor() {
    this.appInsights = new ApplicationInsights({
      config: {
        connectionString: environment.appInsightsConnectionString,
        enableAutoRouteTracking: true // option to log all route changes
      }
    });

    this.appInsights.loadAppInsights();
    this.appInsights.trackPageView();
  }

  logPageView(name?: string, url?: string) { // option to call manually
    this.appInsights.trackPageView({
      name: name,
      uri: url
    });
  }

  logEvent(name: string, customProperties?: ICustomProperties) {
    this.appInsights.trackEvent({ name: name }, customProperties);
  }

  logMetric(name: string, average: number, customProperties?: ICustomProperties) {
    this.appInsights.trackMetric({ name: name, average: average }, customProperties);
  }

  logException(exception: Error, severityLevel?: number) {
    this.appInsights.trackException({ exception: exception, severityLevel: severityLevel });
  }

  logTrace(message: string, customProperties?: ICustomProperties) {
    this.appInsights.trackTrace({ message: message }, customProperties);
  }
}
