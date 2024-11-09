import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình Microservice với RabbitMQ
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'], // RabbitMQ URL nội bộ trong Docker
      queue: 'user_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices(); // Bắt đầu tất cả các microservice
  await app.listen(3001); // Lắng nghe các yêu cầu HTTP
}

bootstrap();
