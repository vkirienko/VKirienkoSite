import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LineChart, Svg, LineChartOptions, Interpolation, LineChartData } from 'chartist'

import { TelemetryService } from './services/telemetry.service';
import { TelemetrySignalrService } from './services/telemetry-signalr.service';
import { SensorTelemetry } from './models/sensor-telemetry.model';


@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  days = 7;
  samples = 84;

  labels: string[] = [];

  lastTelemetry: SensorTelemetry;
  lastTelemetry$: Subscription;

  constructor(
    private telemetryService: TelemetryService,
    private signalRService: TelemetrySignalrService) {
    this.labels = this.populateLabels();
  }

  startAnimation(chart: LineChart): void {
    let seq = 0;
    const delays = 80;
    const durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: Svg.Easing.easeOutQuint
          }
        });
      }
    });

    seq = 0;
  }

  ngOnInit(): void {
    this.telemetryService.getLastTelemetry()
      .subscribe(telemetry => {
        this.lastTelemetry = telemetry;
      });

    this.telemetryService.getTelemetry(this.days, this.samples)
      .subscribe(telemetry => {
        this.createTemperatureChart(telemetry);
        this.createHumidityChart(telemetry);
        this.createPressureChart(telemetry);
        this.createTvocChart(telemetry);
        this.createRadiationChart(telemetry);
      });

    this.signalRService.startConnection();

    this.lastTelemetry$ = this.signalRService
      .addLastTelemetryListener()
      .pipe(untilDestroyed(this))
      .subscribe(telemetry => {
        console.log(telemetry);
        this.lastTelemetry = telemetry;
      });
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection();
  }

  private populateLabels(): string[] {
    const labels: string[] = [];

    const day = new Date();

    const rollover = (this.samples / this.days);

    for (let i = this.samples; i >= 0; i--) {
      if ((i % rollover) == 0) {
        labels[i] = day.getDate().toString();
        day.setDate(day.getDate() - 1);
      }
      //else {
      //  labels[i] = '';
      //}
    }

    return labels;
  }

  private getChartData(data: number[]): LineChartData {
    const chartData = {
      labels: this.labels,
      series: [] 
    };

    chartData.series.push(data);

    return chartData as LineChartData;
  }

  private getChartOptions(data: number[]): LineChartOptions {
    const min = Math.min.apply(null, data.filter(n => n != null));
    const max = Math.max.apply(null, data.filter(n => n != null));

    const chartOptions: LineChartOptions = { 
      lineSmooth: Interpolation.cardinal({
        tension: 0
      }),
      low: Math.floor(min - (max-min) * 0.05),
      high: Math.ceil(max + (max - min) * 0.05),
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      showArea: true
    };

    return chartOptions;
  }

  private createTemperatureChart(telemetry: SensorTelemetry[]): void {
    const data = telemetry.map(t => t.temperature);

    this.startAnimation(new LineChart('#temperatureChart', this.getChartData(data), this.getChartOptions(data)));
  }

  private createHumidityChart(telemetry: SensorTelemetry[]): void {
    const data = telemetry.map(t => t.humidity);

    this.startAnimation(new LineChart('#humidityChart', this.getChartData(data), this.getChartOptions(data)));
  }

  private createPressureChart(telemetry: SensorTelemetry[]): void {
    const data = telemetry.map(t => t.pressure);

    this.startAnimation(new LineChart('#pressureChart', this.getChartData(data), this.getChartOptions(data)));
  }

  private createTvocChart(telemetry: SensorTelemetry[]): void {
    const data = telemetry.map(t => t.tvoc == null ? null : t.tvoc / 100000);

    this.startAnimation(new LineChart('#tvocChart', this.getChartData(data), this.getChartOptions(data)));
  }

  private createRadiationChart(telemetry: SensorTelemetry[]): void {
    const data = telemetry.map(t => t.radiation);

    this.startAnimation(new LineChart('#radiationChart', this.getChartData(data), this.getChartOptions(data)));
  }
}
