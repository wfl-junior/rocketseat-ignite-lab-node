import { Notification } from "~/src/app/entities/notification";
import { NotificationsRepository } from "~/src/app/repositories/notifications-repository";

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(
    notificationId: Notification["id"],
  ): Promise<Notification | null> {
    const notification = this.notifications.find(
      ({ id }) => id === notificationId,
    );

    return notification ?? null;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      notification => notification.recipientId === recipientId,
    );
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      ({ id }) => id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countManyByRecipientId(
    recipientId: Notification["recipientId"],
  ): Promise<number> {
    return this.notifications.filter(
      notification => notification.recipientId === recipientId,
    ).length;
  }
}
