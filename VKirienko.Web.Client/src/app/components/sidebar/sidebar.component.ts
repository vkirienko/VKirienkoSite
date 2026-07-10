import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

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
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, RouterLinkActive]
})
export class SidebarComponent {
  menuItems: RouteInfo[] = ROUTES.filter(menuItem => menuItem);
}
