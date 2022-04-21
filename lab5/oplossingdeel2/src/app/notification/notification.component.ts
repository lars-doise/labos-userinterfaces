import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() message: string;
  @Input() iconType: string;
  timeStamp;

  constructor() {
    this.timeStamp = new Date();
  }

  ngOnInit(): void {
  }

}
