import { Location, NgIf, PopStateEvent } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event, RouterEvent, RouterOutlet } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter } from 'rxjs/operators';

import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    standalone: true,
    imports: [SidebarComponent, NavbarComponent, RouterOutlet, NgIf, FooterComponent]
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(public location: Location, private router: Router) { }

  ngOnInit(): void {
    document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');

    const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
    const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper') as HTMLElement;

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });

    this.router.events
      .pipe(filter(event => event instanceof RouterEvent))
      .subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          if (event.url != this.lastPoppedUrl)
            this.yScrollStack.push(window.scrollY);
        } else if (event instanceof NavigationEnd) {
          if (event.url == this.lastPoppedUrl) {
            this.lastPoppedUrl = undefined;
            window.scrollTo(0, this.yScrollStack.pop());
          } else
            window.scrollTo(0, 0);
        }
      });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });

    if (window.matchMedia(`(min-width: 960px)`).matches) {
      new PerfectScrollbar(elemMainPanel);
      new PerfectScrollbar(elemSidebar);
    }
  }

  ngAfterViewInit(): void {
    this.runOnRouteChange();
  }

  isMaps(path: string): boolean {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    }
    else {
      return true;
    }
  }

  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches) {
      const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
}
