import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma.service";
import { transformEntitiesDatesToString } from "./utils/transform-dates-to-string.util";

describe("NotificationsController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    prisma = new PrismaService();
  });

  it("should return all notifications", async () => {
    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return request(app.getHttpServer())
      .get("/notifications")
      .expect(200)
      .expect({
        notifications: transformEntitiesDatesToString(notifications),
      });
  });
});
