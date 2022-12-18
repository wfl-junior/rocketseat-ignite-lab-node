import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import {
  SendNotification,
  SendNotificationRequest,
} from "~/src/app/use-cases/send-notification";

@Controller()
export class KafkaNotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @EventPattern(process.env.KAFKA_SEND_NOTIFICATION_TOPIC)
  async handleSendNotification(@Payload() payload: SendNotificationRequest) {
    const { content, category, recipientId } = payload;
    await this.sendNotification.execute({ content, category, recipientId });
  }
}
