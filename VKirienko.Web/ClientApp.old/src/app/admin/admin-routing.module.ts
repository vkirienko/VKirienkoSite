import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminComponent, data: { title: 'Admin' } },
  { path: '', redirectTo: 'admin', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutingModule {
}
