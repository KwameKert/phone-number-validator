import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Icons } from '../../icons';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  message: string;
  type: string;
  parameters: any;
  icons = Icons;

  notificationIcons = {
    success: Icons.MaterialIcons.success,
    error: Icons.MaterialIcons.error,
    info: Icons.MaterialIcons.info,
    warn: Icons.MaterialIcons.warn,
  } as any;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<NotificationComponent>
  ) {
    this.message = data.message;
    this.type = data.type;
    if (data.parameters) {
      this.parameters = data.parameters;
    }
  }

  ngOnInit(): void {
    if (this.parameters) {
      const keys = Object.keys(this.parameters);
      const values: any = Object.values(this.parameters);
      for (let i = 0; i < keys.length; i++) {
        this.message = this.message.replace(
          '{{' + keys[i] + '}}',
          values[i].toString()
        );
      }
    }
  }

  closeSnackBar(): void {
    this.snackBarRef.dismiss();
  }
}
