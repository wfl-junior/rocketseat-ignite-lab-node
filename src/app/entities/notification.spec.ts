import { Notification } from "./notification";
import { NotificationContent } from "./notification-content";

describe("Notification", () => {
  it("should be able to create a notification content", async () => {
    const notification = new Notification({
      content: new NotificationContent("Nova solicitação de amizade!"),
      category: "social",
      recipientId: "example-recipient-id",
    });

    expect(notification).toBeInstanceOf(Notification);
  });

  it("should return props and with when accessing as json", async () => {
    const notification = new Notification({
      content: new NotificationContent("Nova solicitação de amizade!"),
      category: "social",
      recipientId: "example-recipient-id",
    });

    expect(notification.toJSON()).toBe(notification.props);
  });
});
