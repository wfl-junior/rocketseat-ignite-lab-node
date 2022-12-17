import { Injectable } from "@nestjs/common";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

export interface CountRecipientNotificationsRequest {
  recipientId: Notification["recipientId"];
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
