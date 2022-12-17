import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const statusMessageMap: Record<number, string> = {
      500: "Houston, we have a problem.",
      403: "You shall not pass.",
      401: "You shall not pass.",
    };

    const responseBody = {
      ok: false,
      message: statusMessageMap[httpStatus] ?? "Houston, we have a problem.",
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
