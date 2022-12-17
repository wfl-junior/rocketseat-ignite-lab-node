import { NotificationFactory } from "~/test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "~/test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";

describe("ReadNotification", () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const readNotification = new ReadNotification(notificationsRepository);

  it("should be able to read a notification", async () => {
    const notification = NotificationFactory.make();

    await notificationsRepository.create(notification);
    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeInstanceOf(
      Date,
    );
  });

  it("should not be able to read a non existing notification", async () => {
    expect(
      readNotification.execute({ notificationId: "fake-notification-id" }),
    ).rejects.toThrowError(NotificationNotFound);
  });
});
