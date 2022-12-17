import { Injectable } from "@nestjs/common";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

export interface ReadNotificationRequest {
  notificationId: Notification["id"];
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();
    await this.notificationsRepository.save(notification);
  }
}
