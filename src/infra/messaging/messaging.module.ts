import { Module } from "@nestjs/common";
import { SendNotification } from "~/src/app/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { KafkaNotificationsController } from "./kafka/controllers/kafka-notifications.controller";
import { KafkaConsumerService } from "./kafka/kafka-consumer.service";

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [KafkaNotificationsController],
})
export class MessagingModule {}
