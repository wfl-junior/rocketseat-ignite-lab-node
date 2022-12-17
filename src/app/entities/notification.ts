import { randomUUID } from "node:crypto";
import type { Replace } from "~/src/helpers/replace";
import { NotificationContent } from "./notification-content";

export interface NotificationProps {
  id: string;
  recipientId: string;
  content: NotificationContent;
  category: string;
  readAt: Date | null;
  canceledAt: Date | null;
  createdAt: Date;
}

type NewNotificationProps = Replace<
  NotificationProps,
  Partial<Pick<NotificationProps, "createdAt" | "readAt" | "canceledAt" | "id">>
>;

export class Notification {
  readonly #props: NotificationProps;

  constructor({
    id = randomUUID(),
    readAt = null,
    canceledAt = null,
    createdAt = new Date(),
    ...props
  }: NewNotificationProps) {
    this.#props = {
      ...props,
      id,
      readAt,
      canceledAt,
      createdAt,
    };
  }

  public get id() {
    return this.#props.id;
  }

  public get props() {
    return this.#props;
  }

  public get recipientId() {
    return this.#props.recipientId;
  }

  public set recipientId(recipientId: NotificationProps["recipientId"]) {
    this.#props.recipientId = recipientId;
  }

  public get content() {
    return this.#props.content;
  }

  public set content(content: NotificationProps["content"]) {
    this.#props.content = content;
  }

  public get category() {
    return this.#props.category;
  }

  public set category(category: NotificationProps["category"]) {
    this.#props.category = category;
  }

  public get readAt() {
    return this.#props.readAt;
  }

  public read() {
    this.#props.readAt = new Date();
  }

  public unread() {
    this.#props.readAt = null;
  }

  public get canceledAt() {
    return this.#props.canceledAt;
  }

  public cancel() {
    this.#props.canceledAt = new Date();
  }

  public get createdAt() {
    return this.#props.createdAt;
  }

  public toJSON() {
    return this.props;
  }
}
