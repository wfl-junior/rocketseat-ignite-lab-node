import { Body, Controller, Post } from "@nestjs/common";
import { SendNotification } from "~/src/app/use-cases/send-notification";
import { CreateNotificationDTO } from "../DTOs/create-notification-dto";

@Controller("/notifications")
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}
