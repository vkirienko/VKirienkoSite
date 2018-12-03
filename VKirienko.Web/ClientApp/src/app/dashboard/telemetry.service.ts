import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SensorTelemetry } from './sensor-telemetry.model';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {

  constructor(private http: HttpClient) {
  }

  getLastTelemetry(): Observable<SensorTelemetry> {
    return this.http.get<SensorTelemetry>('/api/Telemetry');
  }

  getTelemetry(days: number, samples: number): Observable<SensorTelemetry[]> {
    return this.http.get<SensorTelemetry[]>('/api/Telemetry/' + days.toString() + '/' + samples.toString());
  }
}
