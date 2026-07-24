import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ROUTES, RouteInfo } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  private listTitles: RouteInfo[] = ROUTES.filter(listTitle => listTitle);
  location: Location;
  mobile_menu_visible = 0;
  private toggleButton?: Element;
  private sidebarVisible: boolean;
  layer? : Element;

  constructor(location: Location, private element: ElementRef, private router: Router) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit(): void {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe(() => {
      this.sidebarClose();
      this.layer = document.getElementsByClassName('close-layer')[0];
      if (this.layer) {
        this.layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  sidebarOpen(): void {
    const body = document.getElementsByTagName('body')[0];

    if (this.toggleButton) {
      const toggleButton = this.toggleButton;
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
    }

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose(): void {
    const body = document.getElementsByTagName('body')[0];

    if (this.toggleButton) {
      this.toggleButton.classList.remove('toggled');
    }

    this.sidebarVisible = false;

    body.classList.remove('nav-open');
  }

  sidebarToggle(): void {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if (this.layer) {
        this.layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      const _this = this;

      this.layer = document.createElement('div');
      this.layer.setAttribute('class', 'close-layer');

      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild(this.layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild(this.layer);
      }

      setTimeout(function () {
        if (_this.layer) {
          _this.layer.classList.add('visible');
        }
      }, 100);

      this.layer.addEventListener("click", () => { 
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;

        if (this.layer) {
            this.layer.classList.remove('visible');
        }

        setTimeout(function () {
          if (_this.layer) {
            _this.layer.remove();
          }
          $toggle.classList.remove('toggled');
        }, 400);
      });

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  }

  getTitle(): string {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }

    const lastTtitle = titlee.split('/').pop();
    titlee = lastTtitle ?? '';

    for (const title of this.listTitles) {
      if (title.path === '/' + titlee) {
        return title.title;
      }
    }
    return 'Dashboard';
  }
}
