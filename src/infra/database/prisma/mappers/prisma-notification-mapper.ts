import { Notification } from "~/src/app/entities/notification";
import { NotificationContent } from "~/src/app/entities/notification-content";
import type { PrismaNotification } from "../types";

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): PrismaNotification {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(prismaNotification: PrismaNotification) {
    return new Notification({
      id: prismaNotification.id,
      content: new NotificationContent(prismaNotification.content),
      category: prismaNotification.category,
      recipientId: prismaNotification.recipientId,
      readAt: prismaNotification.readAt,
      canceledAt: prismaNotification.canceledAt,
      createdAt: prismaNotification.createdAt,
    });
  }

  static toDomainArray(prismaNotifications: PrismaNotification[]) {
    return prismaNotifications.map(prismaNotification => {
      return this.toDomain(prismaNotification);
    });
  }
}
