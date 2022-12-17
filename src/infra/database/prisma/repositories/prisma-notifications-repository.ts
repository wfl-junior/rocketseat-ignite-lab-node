import { Injectable } from "@nestjs/common";
import { Notification } from "~/src/app/entities/notification";
import { NotificationsRepository } from "~/src/app/repositories/notifications-repository";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(
    notificationId: Notification["id"],
  ): Promise<Notification | null> {
    const prismaNotification = await this.prismaService.notification.findUnique(
      {
        where: { id: notificationId },
      },
    );

    if (!prismaNotification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(prismaNotification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const prismaNotifications = await this.prismaService.notification.findMany({
      where: { recipientId },
    });

    return PrismaNotificationMapper.toDomainArray(prismaNotifications);
  }

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }

  async save(notification: Notification): Promise<void> {
    await this.prismaService.notification.update({
      where: { id: notification.id },
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }

  countManyByRecipientId(
    recipientId: Notification["recipientId"],
  ): Promise<number> {
    return this.prismaService.notification.count({
      where: { recipientId },
    });
  }
}
