import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './exception/AllExceptionFilter';

dotenv.config({
    path: '.env.test'
});

async function bootstrap() {
    const logger = new Logger('Bootstrap');

    try {
        console.log('before bug : ...');
        const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
            transport: Transport.TCP,
            options: {
                host: process.env.ORDER_SERVICE_HOST,
                port: Number.parseInt(process.env.ORDER_PORT)
            }
        } as TcpOptions);

        // injection handle execption log
        app.useGlobalFilters(new AllExceptionsFilter());
        console.log('after bug : ');

        const rabbitmqService = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL],
                queue: 'order_queue',
                queueOptions: { durable: false }
            }
        });
        rabbitmqService.useGlobalFilters(new AllExceptionsFilter());
        rabbitmqService.listen();
        app.listen();
    } catch (error) {
        logger.error('An error occurred during bootstrap');
        logger.error(error.message);
        if (error.stack) {
            logger.error(error.stack); // Log stack trace để biết lỗi xuất phát từ đâu
        }
    }
}
bootstrap();
