import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardOldComponent } from '../../dashboard-old/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { AboutComponent } from '../../about/about.component';
import { ContactsComponent } from '../../contacts/contacts.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
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
    DashboardOldComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
	  AboutComponent,
    ContactsComponent,
    FlightRadarComponent,
    SecurityComponent,
    DashboardComponent,
	  ResumeComponent
  ]
})

export class AdminLayoutModule {
}
