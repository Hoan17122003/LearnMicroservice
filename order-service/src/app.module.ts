import { Module } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { OrderController } from './order.controller';
import { OrderEntity } from './model/entities/Order.entity';
import { OrderDetail } from './model/entities/Orderdetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './model/entities/OrderStatus.entity';
import { RabbitMQService } from './Rabbitmq.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'ORDER_CACHE',
                transport: Transport.REDIS,
                options: {
                    host: process.env.REDIS_HOST,
                    port: 6379
                }
            },
            {
                name: 'PRODUCT_RABBITMQ',
                transport: Transport.RMQ,
                options: {
                    urls: [`ampq://guest:guest@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT_COMMAND}`],
                    queue: 'product_queue',
                    queueOptions: {
                        durable: false
                    }
                }
            }
        ]),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'mysql',
                host: process.env.ORDER_DB_HOST || 'localhost',
                port: Number.parseInt(process.env.ORDER_DB_PORT) || 3306,
                username: process.env.ORDER_DB_USER || 'root',
                password: process.env.ORDER_DB_PASSWORD || 'HoanHa',
                database: process.env.ORDER_DB_NAME || 'orderdb',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true
            })
        }),
        TypeOrmModule.forFeature([OrderEntity, OrderDetail, OrderStatus])
    ],
    providers: [OrderService, RabbitMQService],
    controllers: [OrderController]
})
export class AppModule {}
