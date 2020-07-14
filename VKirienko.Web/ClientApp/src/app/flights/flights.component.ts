import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html'
})
export class FlightsComponent implements OnInit {

  emptyUrl: SafeResourceUrl;

  urlFlights: SafeResourceUrl;
  urlGraphs: SafeResourceUrl;
  urlStats: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.emptyUrl = this.sanitizer.bypassSecurityTrustResourceUrl('javascript:void(0)');

    this.urlFlights = this.emptyUrl;
    this.urlGraphs = this.emptyUrl;
    this.urlStats = this.emptyUrl;

    this.activateTab('flights');
  }

  activateTab(tab: string): void {
    switch (tab) {
      case 'flights':
        if (this.urlFlights != this.emptyUrl) {
          return;
        }
        this.urlFlights = this.sanitizer.bypassSecurityTrustResourceUrl(environment.production ? 'https://vkirienko.com/tar' : 'https://vkirienko.com/tar');
        break;
      case 'graphs':
        if (this.urlGraphs != this.emptyUrl) {
          return;
        }
        this.urlGraphs = this.sanitizer.bypassSecurityTrustResourceUrl('https://vkirienko.com/graphs1090');
        break;
      case 'stats':
        if (this.urlStats != this.emptyUrl) {
          return;
        }
        this.urlStats = this.sanitizer.bypassSecurityTrustResourceUrl('https://flightaware.com/adsb/stats/user/vkirienko');
        break;
    }
  }
}
