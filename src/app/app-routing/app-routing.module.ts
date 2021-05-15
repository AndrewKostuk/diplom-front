import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { PersonalAccountComponent } from './../personal-account/personal-account.component';
import { PlannedVisitsComponent } from '../planned-visits/planned-visits.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'account',
    component: PersonalAccountComponent,
  },
  {
    path: 'account/plannedVisits',
    component: PlannedVisitsComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
