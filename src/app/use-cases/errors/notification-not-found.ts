import { EntityNotFoundError } from "./not-found";

export class NotificationNotFound extends EntityNotFoundError {
  constructor() {
    super("Notification");
  }
}
