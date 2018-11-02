import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent
  ],
  exports: [
    AdminComponent
  ],
  providers: [
    NbSidebarService
  ] // we need this service for the sidebar
})

export class AdminModule {
}
