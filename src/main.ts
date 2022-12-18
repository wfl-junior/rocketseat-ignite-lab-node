import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./infra/http/exceptions/all-exceptions-filter";
import { KafkaConsumerService } from "./infra/messaging/kafka/kafka-consumer.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: validationErrors => {
        return new BadRequestException({
          ok: false,
          errors: validationErrors.reduce<Record<string, string[]>>(
            (errors, { property, constraints }) => {
              if (constraints) {
                errors[property] = Object.values(constraints);
              }

              return errors;
            },
            {},
          ),
        });
      },
    }),
  );

  const kafkaConsumerService = app.get(KafkaConsumerService);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService,
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
