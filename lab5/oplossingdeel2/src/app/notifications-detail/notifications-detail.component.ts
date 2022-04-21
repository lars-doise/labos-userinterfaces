import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotificationServiceService} from '../notification-service.service';

@Component({
  selector: 'app-notifications-detail',
  templateUrl: './notifications-detail.component.html',
  styleUrls: ['./notifications-detail.component.css']
})
export class NotificationsDetailComponent implements OnInit {
  id: number;
  message: string;
  icon: string;

  constructor(private route: ActivatedRoute, private notificationSerive: NotificationServiceService) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap);
    this.notificationSerive.getNotification(this.id)
      .then(result => {
        this.message = result.message;
        this.icon = result.icon;
      });
  }
}
