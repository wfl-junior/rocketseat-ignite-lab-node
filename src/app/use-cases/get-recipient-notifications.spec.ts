import { NotificationFactory } from "~/test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "~/test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe("GetRecipientNotifications", () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const getRecipientNotifications = new GetRecipientNotifications(
    notificationsRepository,
  );

  it("should be able to get recipient notifications", async () => {
    const recipientOneId = "recipient-1";
    const firstNotification = NotificationFactory.make({
      recipientId: recipientOneId,
    });

    const secondNotification = NotificationFactory.make({
      recipientId: recipientOneId,
    });

    await Promise.all([
      notificationsRepository.create(firstNotification),
      notificationsRepository.create(secondNotification),
      notificationsRepository.create(
        NotificationFactory.make({ recipientId: "recipient-2" }),
      ),
    ]);

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: recipientOneId,
    });

    expect(notifications).toEqual([firstNotification, secondNotification]);
  });
});
