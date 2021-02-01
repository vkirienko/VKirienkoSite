import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

import { TelemetryService } from './telemetry.service';
import { SensorTelemetry } from './sensor-telemetry.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  days = 7;
  samples = 84;

  labels: string[] = [];

  lastTelemetry: SensorTelemetry;

  constructor(private telemetryService: TelemetryService) {
    this.labels = this.populateLabels();
  }

  startAnimation(chart: Chartist.IChartistLineChart): void {
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
            easing: Chartist.Svg.Easing.easeOutQuint
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
            easing: 'ease'
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

  private getChartData(data: number[]): Chartist.IChartistData {
    const chartData = {
      labels: this.labels,
      series: [] 
    };

    chartData.series.push(data);

    return chartData as Chartist.IChartistData;
  }

  private getChartOptions(data: number[]): Chartist.ILineChartOptions {
    const chartOptions: Chartist.ILineChartOptions = {
      lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }),
      low: Math.min.apply(null, data.filter(n => n != null && n != 0)),
      high: Math.max.apply(null, data.filter(n => n != null && n != 0)),
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    return chartOptions;
  }

  private createTemperatureChart(telemetry: SensorTelemetry[]): void {
    const data = telemetry.map(t => t.temperature);

    this.startAnimation(new Chartist.Line('#temperatureChart', this.getChartData(data), this.getChartOptions(data)));
  }

  private createHumidityChart(telemetry: SensorTelemetry[]): void {
    const data = telemetry.map(t => t.humidity);

    this.startAnimation(new Chartist.Line('#humidityChart', this.getChartData(data), this.getChartOptions(data)));
  }

  private createPressureChart(telemetry: SensorTelemetry[]): void {
    const data = telemetry.map(t => t.pressure);

    this.startAnimation(new Chartist.Line('#pressureChart', this.getChartData(data), this.getChartOptions(data)));
  }

  private createTvocChart(telemetry: SensorTelemetry[]): void {
    const data = telemetry.map(t => t.tvoc == null ? null : t.tvoc / 100000);

    this.startAnimation(new Chartist.Line('#tvocChart', this.getChartData(data), this.getChartOptions(data)));
  }

  private createRadiationChart(telemetry: SensorTelemetry[]): void {
    const data = telemetry.map(t => t.radiation);

    this.startAnimation(new Chartist.Line('#radiationChart', this.getChartData(data), this.getChartOptions(data)));
  }
}
