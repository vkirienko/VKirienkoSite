import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { SettingsService } from '../core/services/settings.service';
import { Settings } from '../core/models/settings.model';


@Component({
    selector: 'app-flight-feed',
    templateUrl: './flight-feed.component.html',
    styleUrls: ['./flight-feed.component.css'],
    standalone: true,
    imports: [NgIf]
})
export class FlightFeedComponent implements OnInit {

  settings: Settings;

  constructor(
    private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.settingsService.get()
      .subscribe(settings => {
        this.settings = settings;
      });
  }
}
