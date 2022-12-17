import type { Notification } from "~/src/app/entities/notification";

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return notification.toJSON();
  }

  static toHttpArray(notifications: Notification[]) {
    return notifications.map(notification => this.toHttp(notification));
  }
}
