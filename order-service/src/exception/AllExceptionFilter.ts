import { Catch, ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        this.logger.log('hehehe');

        // Log chi tiết lỗi
        this.logger.error(`Exception thrown: ${exception.message}`);
        if (exception.stack) {
            this.logger.error(exception.stack); // In ra stack trace
        }

        // Optionally, gửi phản hồi HTTP
        response.status(500).json({
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message
        });
    }
}
