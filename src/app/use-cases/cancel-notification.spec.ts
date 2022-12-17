import { NotificationFactory } from "~/test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "~/test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";

describe("CancelNotification", () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const cancelNotification = new CancelNotification(notificationsRepository);

  it("should be able to cancel a notification", async () => {
    const notification = NotificationFactory.make();

    await notificationsRepository.create(notification);
    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toBeInstanceOf(
      Date,
    );
  });

  it("should not be able to cancel a non existing notification", async () => {
    expect(
      cancelNotification.execute({ notificationId: "fake-notification-id" }),
    ).rejects.toThrowError(NotificationNotFound);
  });
});
