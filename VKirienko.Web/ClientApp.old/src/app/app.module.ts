import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  NbSidebarModule,
  NbLayoutModule,
  NbSidebarService,
  NbThemeModule,
  NbMenuService,
  NbMenuModule
} from '@nebular/theme';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule.forRoot(),
    AdminModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    AppRoutingModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    NbSidebarService,
    NbMenuService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
}
