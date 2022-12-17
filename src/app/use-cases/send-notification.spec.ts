import { InMemoryNotificationsRepository } from "~/test/repositories/in-memory-notifications-repository";
import { Notification } from "../entities/notification";
import { SendNotification } from "./send-notification";

describe("SendNotification", () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const sendNotification = new SendNotification(notificationsRepository);

  it("should be able to send a notification", async () => {
    expect(notificationsRepository.notifications).toHaveLength(0);

    const { notification } = await sendNotification.execute({
      recipientId: "example-recipient-id",
      category: "social",
      content: "Você possui uma nova solicitação de amizade!",
    });

    expect(notification).toBeInstanceOf(Notification);
    expect(notificationsRepository.notifications).toEqual([notification]);
  });
});
