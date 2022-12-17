import { IsNotEmpty, IsUUID, Length } from "class-validator";
import type { SendNotificationRequest } from "~/src/app/use-cases/send-notification";

export class CreateNotificationDTO implements SendNotificationRequest {
  @IsNotEmpty()
  @IsUUID(4)
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 255)
  content: string;

  @IsNotEmpty()
  @Length(1, 255)
  category: string;
}
