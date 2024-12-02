import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { ConfigService as ConfigSystemApplication } from './service/config/ConfigService.service';

dotenv.config({
    path: '.env.test'
});

async function bootstrap() {
    // const configService = new ConfigSystemApplication();
    // Cấu hình Microservice với RabbitMQ
    // console.log(`${configService.get('RABBITMQ_HOST')} - port : ${configService.get('RABBITMQ_PORT_COMMAND')}`);
    // start TCP and Rabbmitmq
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.USER_SERVICE_HOST,
            port: Number.parseInt(process.env.USER_SERVICE_PORT)
        
        }
    } as TcpOptions);
    const rabbitmqService = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [
                process.env.RABBITMQ_URL
            ], // RabbitMQ URL nội bộ trong Docker
            queue: 'user_queue',
            queueOptions: { durable: false }
        }
    });
    rabbitmqService.listen();
    app.listen();
}

bootstrap();
