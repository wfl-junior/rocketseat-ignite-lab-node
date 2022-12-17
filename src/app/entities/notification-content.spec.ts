import { NotificationContent } from "./notification-content";

describe("NotificationContent", () => {
  it("should be able to create a notification content with 5 characters", async () => {
    const content = new NotificationContent("a".repeat(5));

    expect(content).toBeInstanceOf(NotificationContent);
  });

  it("should be able to create a notification content with 255 characters", async () => {
    const content = new NotificationContent("a".repeat(255));

    expect(content).toBeInstanceOf(NotificationContent);
  });

  it("should not be able to create a notification content with less than 5 characters", async () => {
    const createContent = () => new NotificationContent("a".repeat(4));

    expect(createContent).toThrowError(
      "Content length must be between 5 and 255",
    );
  });

  it("should not be able to create a notification content with more than 255 characters", async () => {
    const createContent = () => new NotificationContent("a".repeat(256));

    expect(createContent).toThrowError(
      "Content length must be between 5 and 255",
    );
  });

  it("should return value when accessing as string", async () => {
    const content = new NotificationContent(
      "Você possui uma nova solicitação de amizade!",
    );

    expect(String(content)).toBe(content.value);
  });

  it("should return value when accessing as json", async () => {
    const content = new NotificationContent(
      "Você possui uma nova solicitação de amizade!",
    );

    expect(content.toJSON()).toBe(content.value);
  });
});
