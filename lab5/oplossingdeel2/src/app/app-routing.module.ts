import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {EnergyComponent} from './energy/energy.component';
import {TemperatureComponent} from './temperature/temperature.component';
import {SecurityComponent} from './security/security.component';
import {NotificationsDetailComponent} from './notifications-detail/notifications-detail.component';

const routes: Routes = [
  { path: '', component: OverviewComponent},
  { path: 'overview', component: OverviewComponent},
  { path: 'energy', component: EnergyComponent},
  { path: 'temperature', component: TemperatureComponent},
  { path: 'security', component: SecurityComponent},
  { path: 'notification/:id', component: NotificationsDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
