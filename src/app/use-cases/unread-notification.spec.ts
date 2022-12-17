import { NotificationFactory } from "~/test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "~/test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";

describe("UnunreadNotification", () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const unreadNotification = new UnreadNotification(notificationsRepository);

  it("should be able to unread a notification", async () => {
    const notification = NotificationFactory.make({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);
    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it("should not be able to unread a non existing notification", async () => {
    expect(
      unreadNotification.execute({ notificationId: "fake-notification-id" }),
    ).rejects.toThrowError(NotificationNotFound);
  });
});
