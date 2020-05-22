import { Component, OnInit, isDevMode } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES_DEV: RouteInfo[] = [
  { path: '/about', title: 'About Me', icon: 'person', class: '' },
  { path: '/contacts', title: 'Contacts', icon: 'contacts', class: '' },
  { path: '/resume', title: 'Resume', icon: 'description', class: '' },
  { path: '/flights', title: 'Flight Radar', icon: 'flight', class: '' },
  { path: '/dashboard', title: 'IoT Dashboard', icon: 'dashboard', class: '' },
  { path: '/security', title: 'Security', icon: 'security', class: '' },
  { path: '', title: '', icon: '', class: '' },
  { path: '/dashboard-old', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
];

export const ROUTES: RouteInfo[] = [
  { path: '/about', title: 'About Me', icon: 'person', class: '' },
  { path: '/contacts', title: 'Contacts', icon: 'contacts', class: '' },
  { path: '/resume', title: 'Resume', icon: 'description', class: '' },
  { path: '', title: '', icon: '', class: '' },
  { path: '/flights', title: 'Flight Radar', icon: 'flight', class: '' },
  { path: '/dashboard', title: 'IoT Dashboard', icon: 'dashboard', class: '' },
  { path: '/security', title: 'Security', icon: 'security', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];

  ngOnInit(): void {
    this.menuItems = isDevMode() ? ROUTES_DEV.filter(menuItem => menuItem) : ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu(): boolean {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
}
