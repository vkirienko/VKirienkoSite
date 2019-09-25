import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

import { TelemetryService } from './telemetry.service';
import { SensorTelemetry } from './sensor-telemetry.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  days = 7;
  samples = 84;

  lastTelemetry: SensorTelemetry;

  constructor(private telemetryService: TelemetryService) {
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

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
  };


  ngOnInit() {
    this.telemetryService.getLastTelemetry()
      .subscribe(telemetry => {
        this.lastTelemetry = telemetry;
      });

    this.telemetryService.getTelemetry(this.days, this.samples)
      .subscribe(telemetry => {
        this.createCharts(telemetry);
      });
  }

  private populateLabels(): string[] {
    let labels: string[] = [];

    let day = new Date();

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

  private createCharts(telemetry: SensorTelemetry[]) {
    let temperature: number[] = [];
    let humidity: number[] = [];
    let pressure: number[] = [];
    let tvoc: number[] = [];

    for (let t of telemetry) {
      temperature.push(t.temperature);
      humidity.push(t.humidity);
      pressure.push(t.pressure);
      tvoc.push(t.tvoc / 100000);
    }

    const labels = this.populateLabels();

    /* ----------==========    Temperature Chart initialization For Documentation    ==========---------- */

    const dataTemperatureChart: any = { labels: labels, series: [] };

    const optionsTemperatureChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: Math.min(...temperature),
      high: Math.max(...temperature),
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    dataTemperatureChart.series.push(temperature);

    var temperatureChart = new Chartist.Line('#temperatureChart', dataTemperatureChart, optionsTemperatureChart);

    this.startAnimationForLineChart(temperatureChart);

    /* ----------==========     Pressure Chart initialization    ==========---------- */

    const dataHumidityChart: any = { labels: labels, series: [] };

    const optionsHumidityChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: Math.min(...humidity),
      high: Math.max(...humidity),
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    dataHumidityChart.series.push(humidity);

    var humidityChart = new Chartist.Line('#humidityChart', dataHumidityChart, optionsHumidityChart);

    this.startAnimationForLineChart(humidityChart);

    /* ----------==========     Pressure Chart initialization    ==========---------- */

    const dataPressureChart: any = { labels: labels, series: [] };
    
    const optionsPressureChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: Math.min(...pressure),
      high: Math.max(...pressure),
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    dataPressureChart.series.push(pressure);

    var pressureChart = new Chartist.Line('#pressureChart', dataPressureChart, optionsPressureChart);

    this.startAnimationForLineChart(pressureChart);

    /* ----------==========     TVOC Chart initialization    ==========---------- */

    const dataTvocChart: any = { labels: labels, series: [] };

    const optionsTvocChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: Math.round(Math.min(...tvoc) * 0.99),
      high: Math.round(Math.max(...tvoc) * 1.01),
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    dataTvocChart.series.push(tvoc);

    var tvocChart = new Chartist.Line('#tvocChart', dataTvocChart, optionsTvocChart);

    this.startAnimationForLineChart(tvocChart);
  }
}
