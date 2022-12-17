import type { Prisma } from "@prisma/client";
import { IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateNotificationBody implements Prisma.NotificationCreateInput {
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
