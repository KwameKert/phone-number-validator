import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { NotificationComponent } from '../components/notification/notification.component';
import { NOTIFICATION } from '../components/notification/notification.constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  STANDARD_TIME = 5000;
  constructor(public snackBar: MatSnackBar) {}

  openSnackbar(
    type?: string,
    message?: string | any,
    timing?: number,
    parameters?: any
  ): void {
    const notificationConfig: any = {
      data: parameters ? { message, type, parameters } : { message, type },
      panelClass: ['notification', type],
    };
    if (type !== NOTIFICATION.ERROR) {
      notificationConfig.duration = timing ? timing : this.STANDARD_TIME;
    }
    if (Array.isArray(message)) {
      message.forEach((messageSent: any, index: number) => {
        setTimeout(() => {
          notificationConfig.data.message = message[index];
          this.snackBar.openFromComponent(
            NotificationComponent,
            notificationConfig
          );
        }, index * (this.STANDARD_TIME + 500));
      });
    } else {
      this.snackBar.openFromComponent(
        NotificationComponent,
        notificationConfig
      );
    }
  }
}
