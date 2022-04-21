import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './notification/notification.component';
import { OverviewComponent } from './overview/overview.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { EnergyComponent } from './energy/energy.component';
import { SecurityComponent } from './security/security.component';
import { TemperatureGuageComponent } from './temperature-guage/temperature-guage.component';
import {FormsModule} from '@angular/forms';
import { NotificationsDetailComponent } from './notifications-detail/notifications-detail.component';
import {NotificationServiceService} from './notification-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    OverviewComponent,
    TemperatureComponent,
    EnergyComponent,
    SecurityComponent,
    TemperatureGuageComponent,
    NotificationsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [NotificationServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
