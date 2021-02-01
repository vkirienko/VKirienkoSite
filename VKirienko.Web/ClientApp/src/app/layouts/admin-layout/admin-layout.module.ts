import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { AboutComponent } from '../../about/about.component';
import { ContactsComponent } from '../../contacts/contacts.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { FlightFeedComponent } from '../../flight-feed/flight-feed.component';
import { FlightRadarComponent } from '../../flight-radar/flight-radar.component';
import { ResumeComponent } from '../../resume/resume.component';
import { SecurityComponent } from '../../security/security.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    FontAwesomeModule,
  ],
  declarations: [
    AboutComponent,
    ContactsComponent,
    FlightFeedComponent,
    FlightRadarComponent,
    SecurityComponent,
    DashboardComponent,
    ResumeComponent
  ]
})

export class AdminLayoutModule {
}
