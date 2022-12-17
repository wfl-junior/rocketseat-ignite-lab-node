import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateNotificationBody } from "./create-notification-body";
import { PrismaService } from "./prisma.service";

@Controller("/notifications")
export class NotificationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("/")
  async list() {
    return {
      notifications: await this.prisma.notification.findMany({
        orderBy: {
          createdAt: "desc",
        },
      }),
    };
  }

  @Post("/")
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    return {
      notification: await this.prisma.notification.create({
        data: {
          content,
          category,
          recipientId,
        },
      }),
    };
  }
}
