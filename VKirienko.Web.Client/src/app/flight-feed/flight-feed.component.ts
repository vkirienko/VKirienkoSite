import { Component, OnInit, signal } from '@angular/core';


import { SettingsService } from '../core/services/settings.service';
import { Settings } from '../core/models/settings.model';


@Component({
    selector: 'app-flight-feed',
    templateUrl: './flight-feed.component.html',
    styleUrls: ['./flight-feed.component.css']
})
export class FlightFeedComponent implements OnInit {

  settings = signal<Settings | undefined>(undefined);

  constructor(
    private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.settingsService.get()
      .subscribe(settings => {
        this.settings.set(settings);
      });
  }
}
