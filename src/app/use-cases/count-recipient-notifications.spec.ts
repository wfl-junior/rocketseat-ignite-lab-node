import { NotificationFactory } from "~/test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "~/test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe("CountRecipientNotifications", () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const countRecipientNotifications = new CountRecipientNotifications(
    notificationsRepository,
  );

  it("should be able to count recipient notifications", async () => {
    const recipientOneId = "recipient-1";

    await Promise.all([
      notificationsRepository.create(
        NotificationFactory.make({ recipientId: recipientOneId }),
      ),
      notificationsRepository.create(
        NotificationFactory.make({ recipientId: recipientOneId }),
      ),
      notificationsRepository.create(
        NotificationFactory.make({ recipientId: "recipient-2" }),
      ),
    ]);

    const { count } = await countRecipientNotifications.execute({
      recipientId: recipientOneId,
    });

    expect(count).toBe(2);
  });
});
