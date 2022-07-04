import { Component, OnInit } from '@angular/core';

export declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/about', title: 'About Me', icon: 'person', class: '' },
  { path: '/contacts', title: 'Contacts', icon: 'contacts', class: '' },
  { path: '/resume', title: 'Resume', icon: 'description', class: '' },
  { path: '', title: '', icon: '', class: '' },
  { path: '/flight-radar', title: 'Flight Radar', icon: 'flight', class: '' },
  { path: '/flight-feed', title: 'Flight Feed', icon: 'send', class: '' },
  { path: '/dashboard', title: 'IoT Dashboard', icon: 'dashboard', class: '' },
  { path: '/security', title: 'Security', icon: 'security', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
