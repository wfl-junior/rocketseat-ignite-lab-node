import { Notification } from "./notification";
import { NotificationContent } from "./notification-content";

describe("Notification", () => {
  it("should be able to create a notification content", async () => {
    const content = new Notification({
      content: new NotificationContent("Nova solicitação de amizade!"),
      category: "social",
      recipientId: "example-recipient-id",
    });

    expect(content).toBeInstanceOf(Notification);
  });

  it("should return props when accessing as json", async () => {
    const content = new Notification({
      content: new NotificationContent("Nova solicitação de amizade!"),
      category: "social",
      recipientId: "example-recipient-id",
    });

    expect(content.toJSON()).toBe(content.props);
  });
});
