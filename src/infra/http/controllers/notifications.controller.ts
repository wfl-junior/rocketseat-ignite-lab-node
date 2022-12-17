import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import type { Notification } from "~/src/app/entities/notification";
import { CancelNotification } from "~/src/app/use-cases/cancel-notification";
import { CountRecipientNotifications } from "~/src/app/use-cases/count-recipient-notifications";
import { GetRecipientNotifications } from "~/src/app/use-cases/get-recipient-notifications";
import { ReadNotification } from "~/src/app/use-cases/read-notification";
import { SendNotification } from "~/src/app/use-cases/send-notification";
import { UnreadNotification } from "~/src/app/use-cases/unread-notification";
import { CreateNotificationDTO } from "../DTOs/create-notification-dto";
import { NotificationViewModel } from "../view-models/notification-view-model";

@Controller("/notifications")
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotifications: CountRecipientNotifications,
    private readonly getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      ok: true,
      notification: NotificationViewModel.toHttp(notification),
    };
  }

  @Patch("/:id/cancel")
  async cancel(@Param("id") id: Notification["id"]) {
    await this.cancelNotification.execute({ notificationId: id });

    return {
      ok: true,
    };
  }

  @Get("/from/:recipientId")
  async getFromRecipient(
    @Param("recipientId") recipientId: Notification["recipientId"],
  ) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      ok: true,
      notifications: NotificationViewModel.toHttpArray(notifications),
    };
  }

  @Get("/count/from/:recipientId")
  async countFromRecipient(
    @Param("recipientId") recipientId: Notification["recipientId"],
  ) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      ok: true,
      count,
    };
  }

  @Patch("/:id/read")
  async read(@Param("id") id: Notification["id"]) {
    await this.readNotification.execute({ notificationId: id });

    return {
      ok: true,
    };
  }

  @Patch("/:id/unread")
  async unread(@Param("id") id: Notification["id"]) {
    await this.unreadNotification.execute({ notificationId: id });

    return {
      ok: true,
    };
  }
}
