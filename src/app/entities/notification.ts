import { randomUUID } from "node:crypto";
import type { Replace } from "~/src/helpers/replace";
import { NotificationContent } from "./notification-content";

export interface NotificationProps {
  recipientId: string;
  content: NotificationContent;
  category: string;
  readAt: Date | null;
  createdAt: Date;
}

export class Notification {
  readonly #id: string;
  readonly #props: NotificationProps;

  constructor({
    createdAt = new Date(),
    readAt = null,
    ...props
  }: Replace<NotificationProps, { createdAt?: Date; readAt?: Date | null }>) {
    this.#id = randomUUID();

    this.#props = {
      ...props,
      readAt,
      createdAt,
    };
  }

  public get id() {
    return this.#id;
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

  public set readAt(readAt: NotificationProps["readAt"]) {
    this.#props.readAt = readAt;
  }

  public get createdAt() {
    return this.#props.createdAt;
  }

  public toJSON() {
    return this.props;
  }
}
