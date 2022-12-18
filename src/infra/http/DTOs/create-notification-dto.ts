import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";
import type { SendNotificationRequest } from "~/src/app/use-cases/send-notification";

export class CreateNotificationDTO implements SendNotificationRequest {
  @IsNotEmpty()
  @IsUUID(4)
  @IsString()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 255)
  @IsString()
  content: string;

  @IsNotEmpty()
  @Length(1, 255)
  @IsString()
  category: string;
}
