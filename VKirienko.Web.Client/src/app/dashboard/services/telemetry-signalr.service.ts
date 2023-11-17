import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr'

import { SensorTelemetry } from '../models/sensor-telemetry.model';

@Injectable({
  providedIn: 'root'
})
export class TelemetrySignalrService {

  private hubConnection: signalR.HubConnection;
  private lastTelemetry$: Subject<SensorTelemetry>;

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/telemetry', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  stopConnection = () => {
    this.hubConnection.stop();
  }
    
  addLastTelemetryListener = (): Observable<SensorTelemetry> => {

    this.lastTelemetry$ = new Subject<SensorTelemetry>();

    this.hubConnection.on('LastTelemetry', (data: SensorTelemetry) => {
      this.lastTelemetry$.next(data);
    });

    this.hubConnection.onclose((err?: Error) => {
      console.log('Connection closed')
      if (err) {
        // An error occurs
        this.lastTelemetry$.error(err);
      } else {
        // No more events to be sent.
        this.lastTelemetry$.complete();
      }
    });

    return this.lastTelemetry$;
  }
}