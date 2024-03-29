import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

import { environment } from '../../environments/environment';

@Component({
    selector: 'app-flight-radar',
    templateUrl: './flight-radar.component.html',
    standalone: true,
    imports: [MatButtonModule]
})
export class FlightRadarComponent implements OnInit {

  emptyUrl: SafeResourceUrl;

  urlFlights: SafeResourceUrl;
  urlGraphs: SafeResourceUrl;
  urlPlot: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.emptyUrl = this.sanitizer.bypassSecurityTrustResourceUrl('javascript:void(0)');

    this.urlFlights = this.emptyUrl;
    this.urlGraphs = this.emptyUrl;
    this.urlPlot = this.emptyUrl;

    this.activateTab('flights');
  }

  activateTab(tab: string): void {
    switch (tab) {
      case 'flights':
        if (this.urlFlights != this.emptyUrl) {
          return;
        }
        this.urlFlights = this.sanitizer.bypassSecurityTrustResourceUrl(environment.production ? 'https://vkirienko.com/tar1090' : 'http://localhost');
        break;
      case 'graphs':
        if (this.urlGraphs != this.emptyUrl) {
          return;
        }
        this.urlGraphs = this.sanitizer.bypassSecurityTrustResourceUrl('https://vkirienko.com/graphs1090');
        break;
      case 'plot':
        if (this.urlPlot != this.emptyUrl) {
          return;
        }
        this.urlPlot = this.sanitizer.bypassSecurityTrustResourceUrl('https://vkirienko.com/fa/data/graph.png');
        break;
    }
  }
}
