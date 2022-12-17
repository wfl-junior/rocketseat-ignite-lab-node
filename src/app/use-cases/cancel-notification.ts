import { Injectable } from "@nestjs/common";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

export interface CancelNotificationRequest {
  notificationId: Notification["id"];
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();
    await this.notificationsRepository.save(notification);
  }
}
