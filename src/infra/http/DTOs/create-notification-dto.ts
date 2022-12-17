import { IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateNotificationDTO {
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
