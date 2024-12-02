import { Inject, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { AppService } from './app.service';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService as configServiceApplication } from './service/config/config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { stringify } from 'querystring';
import { Product } from './model/entites/Product.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env.test'
        }),
        ClientsModule.register([
            {
                name: 'USER_RABBITMQ',
                transport: Transport.RMQ,
                options: {
                    urls: [`ampq://guest:guest@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT_COMMAND}`],
                    queue: 'user_queue',
                    queueOptions: {
                        durable: false
                    }
                }
            }
        ]),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('PRODUCT_DB_HOST') || 'localhost',
                port: configService.get<number>('PRODUCT_DB_PORT') || 5432,
                username: configService.get<string>('PRODUCT_DB_USER') || 'admin',
                password: configService.get<string>('PRODUCT_DB_PASSWORD') || 'HaDucHoan',
                database: configService.get<string>('PRODUCT_DB_NAME') || 'postgresproductdbtest',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true
            }),
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductController],
    providers: [AppService]
})
export class AppModule {}
