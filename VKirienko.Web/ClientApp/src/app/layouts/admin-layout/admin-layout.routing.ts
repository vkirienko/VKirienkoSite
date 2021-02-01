import { Routes } from '@angular/router';

import { AboutComponent } from '../../about/about.component';
import { ContactsComponent } from '../../contacts/contacts.component';
import { FlightFeedComponent } from '../../flight-feed/flight-feed.component';
import { FlightRadarComponent } from '../../flight-radar/flight-radar.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ResumeComponent } from '../../resume/resume.component';
import { SecurityComponent } from '../../security/security.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'about',      	  component: AboutComponent },
    { path: 'contacts',    	  component: ContactsComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'flight-feed',    component: FlightFeedComponent },
    { path: 'flight-radar',   component: FlightRadarComponent },
    { path: 'resume',    	    component: ResumeComponent },
    { path: 'security',       component: SecurityComponent }
];
