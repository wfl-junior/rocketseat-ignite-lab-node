import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./infra/http/exceptions/all-exceptions-filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.useGlobalPipes(
    new ValidationPipe({
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

  await app.listen(3000);
}

bootstrap();
