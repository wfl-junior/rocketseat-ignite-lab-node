import {
  Notification,
  NotificationProps,
} from "~/src/app/entities/notification";
import { NotificationContent } from "~/src/app/entities/notification-content";

export class NotificationFactory {
  static make(override?: Partial<NotificationProps>) {
    return new Notification({
      recipientId: "example-recipient-id",
      category: "social",
      content: new NotificationContent(
        "Você possui uma nova solicitação de amizade!",
      ),
      ...override,
    });
  }
}
