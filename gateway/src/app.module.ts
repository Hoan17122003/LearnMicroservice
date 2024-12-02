import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { OrderController } from './order.controller';
import { ProductController } from './product.controller';
import { ConfigService } from './service/config/config.service';

@Module({
    imports: [],
    controllers: [OrderController, ProductController],
    providers: [
        ConfigService,
        {
            provide: 'PRODUCT_SERVICE',
            useFactory: async (configService: ConfigService) => {
                const productServiceoptions = configService.get('productService');
                return ClientProxyFactory.create(productServiceoptions);
            },
            inject: [ConfigService]
        },
        {
            provide: 'ORDER_SERVICE',
            useFactory: async (configService: ConfigService) => {
                const orderServiceoptions = configService.get('orderService');
                return ClientProxyFactory.create(orderServiceoptions);
            },
            inject: [ConfigService]
        },
        {
            provide: 'USER_SERVICE',
            useFactory: async (configService: ConfigService) => {
                const userServiceOptions = configService.get('userService');
                return ClientProxyFactory.create(userServiceOptions);
            },
            inject: [ConfigService]
        }
    ]
})
export class AppModule {}
