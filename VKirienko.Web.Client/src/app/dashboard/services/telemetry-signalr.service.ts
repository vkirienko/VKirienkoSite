import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr'

import { SensorTelemetry } from '../models/sensor-telemetry.model';

@Injectable({
  providedIn: 'root'
})
export class TelemetrySignalrService {
  private hubConnection?: signalR.HubConnection;
  private lastTelemetry$: Subject<SensorTelemetry> = new Subject<SensorTelemetry>();

  // Ensure hub connection exists and handlers are registered. Handlers can be registered
  // before the connection is started so callers may subscribe at any time.
  private ensureHubConnection = (): void => {
    if (this.hubConnection) {
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      // Use default negotiate flow so transport is chosen by the server/client.
      // skipNegotiation:true requires WebSockets and may fail in some environments.
      .withUrl('/telemetry')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    console.log('SignalR: hub connection created, state=', this.hubConnection.state);

    // Register handlers now so they're active as soon as the connection starts.
    this.hubConnection.on('LastTelemetry', (data: SensorTelemetry) => {
      this.lastTelemetry$.next(data);
    });

    this.hubConnection.onclose((err?: Error) => {
      console.log('SignalR connection closed', err);
      if (err) {
        this.lastTelemetry$.error(err);
      } else {
        this.lastTelemetry$.complete();
      }
    });

    this.hubConnection.onreconnecting((err?: Error) => {
      console.log('SignalR reconnecting', err);
    });

    this.hubConnection.onreconnected((connectionId?: string) => {
      console.log('SignalR reconnected, connectionId=', connectionId);
    });
  }

  // Start the connection and return a promise so callers can await success/failure.
  startConnection = async (): Promise<void> => {
    this.ensureHubConnection();

    if (!this.hubConnection) {
      return;
    }

    try {
      console.log('SignalR: starting connection, current state=', this.hubConnection.state);
      if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
        await this.hubConnection.start();
        console.log('SignalR connection started');
      } else {
        console.log('SignalR already connected');
      }
    } catch (err) {
      console.error('Error while starting SignalR connection: ', err);
      // propagate error to subscribers so UI can react
      this.lastTelemetry$.error(err as Error);
    }
  }

  stopConnection = async (): Promise<void> => {
    if (this.hubConnection) {
      try {
        await this.hubConnection.stop();
        console.log('SignalR connection stopped');
      } catch (err) {
        console.log('Error while stopping SignalR connection: ', err);
      } finally {
        this.hubConnection = undefined;
      }
    }
  }

  addLastTelemetryListener = (): Observable<SensorTelemetry> => {
    // Ensure the connection and handlers exist even if the connection isn't started yet.
    this.ensureHubConnection();
    return this.lastTelemetry$;
  }
}
