import {Component, OnInit} from '@angular/core';
import { NotificationServiceService} from '../notification-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  numberOfNotificationsVisible = 0;
  notifications = [];
  notificationsVisible = [];

  constructor(private notificationService: NotificationServiceService) {
  }

  ngOnInit(): void {
    this.notificationService.getAllNotifications()
      .then(result => {
        this.notifications = result;
        this.showMore();
      });
  }

  showMore() {
    this.numberOfNotificationsVisible += Math.min(5, this.notifications.length - this.numberOfNotificationsVisible);
    this.notificationsVisible = this.notifications.slice(0, this.numberOfNotificationsVisible);
  }
}
