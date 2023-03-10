import { Injectable } from "@nestjs/common";
import { Notification } from "../entities/notification";
import { NotificationContent } from "../entities/notification-content";
import { NotificationsRepository } from "../repositories/notifications-repository";

export interface SendNotificationRequest {
  content: string;
  category: string;
  recipientId: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      category,
      content: new NotificationContent(content),
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
