import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private http: HttpClient) {
  }

  notifications = [];

  getAllNotifications(): Promise<{'id', 'message', 'icon'}[]> {
    return new Promise((resolve, reject) => {
      if (this.notifications.length === 0) {
        this.http.get('http://www.mocky.io/v2/5be453402f00002c00d9f48f').subscribe(
          res => {
            /* tslint:disable:no-string-literal */
            this.notifications = res['notifications'];
            /* tslint:enable:no-string-literal */
            resolve(this.notifications);
          });
      } else {
        resolve(this.notifications);
      }
    });
  }

  getNotification(id): Promise<{'id', 'message', 'icon'}> {
    return new Promise((resolve, reject) => {
      if (this.notifications.length === 0) {
        this.http.get('http://www.mocky.io/v2/5be453402f00002c00d9f48f').subscribe(
          res => {
            /* tslint:disable:no-string-literal */
            this.notifications = res['notifications'];
            /* tslint:enable:no-string-literal */
            resolve(this.notifications[id]);
          });
      } else {
        resolve(this.notifications[id]);
      }
    });
  }
}
