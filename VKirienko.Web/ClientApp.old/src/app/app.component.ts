import { Component } from '@angular/core';

import { MENU_ITEMS } from './app-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  debugger;
  menuItems = MENU_ITEMS;
}
