import { Injectable, signal, Signal } from '@angular/core';
import * as signalR from '@microsoft/signalr'

import { SensorTelemetry } from '../models/sensor-telemetry.model';

@Injectable({
  providedIn: 'root'
})
export class TelemetrySignalrService {
  private hubConnection?: signalR.HubConnection;

  // Signal-backed state for zone-less updates
  private _lastTelemetry = signal<SensorTelemetry | null>(new SensorTelemetry());

  get lastTelemetrySignal(): Signal<SensorTelemetry | null> {
    return this._lastTelemetry;
  }

  // allow external population (e.g. initial HTTP fetch)
  setLastTelemetry(data: SensorTelemetry): void {
    this._lastTelemetry.set(data);
  }

  // Ensure hub connection exists and handlers are registered. Handlers can be registered
  // before the connection is started so callers may subscribe at any time.
  private ensureHubConnection = (): void => {
    if (this.hubConnection) {
      return;
    }

    console.log('Connection starting')

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
      console.log(data);
      this._lastTelemetry.set(data);
    });

    this.hubConnection.onclose((err?: Error) => {
      console.log('SignalR connection closed', err);
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

  addLastTelemetryListener = (): void => {
    // Ensure the connection and handlers exist even if the connection isn't started yet.
    this.ensureHubConnection();
  }
}
