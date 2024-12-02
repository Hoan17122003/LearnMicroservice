import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from './service/config/config.service';
import { ConfigService as ConfigServiceSystem } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config({
    path: '.env.test'
});

async function bootstrap() {
    // const configService = await new ConfigService();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.PRODUCT_SERVICE_HOST,
            port: Number.parseInt(process.env.PRODUCT_PORT)
        }
    });
    const rabbmitmqService = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [
                process.env.RABBITMQ_URL
            ], // RabbitMQ URL nội bộ trong Docker
            queue: 'product_queue',
            queueOptions: {
                durable: false
            }
        }
    });
    rabbmitmqService.listen();
    app.listen();
}
bootstrap();
