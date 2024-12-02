import { Body, Controller, Get, HttpException, HttpStatus, Inject, Logger, Post, Query } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { ClientProxy, ClientProxyFactory, MessagePattern, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class OrderController {
    constructor(
        @Inject('PRODUCT_RABBITMQ') private readonly productClient: ClientProxy,
        private readonly orderService: OrderService
    ) {}

    @MessagePattern('order-created')
    public async CreateOrder(@Body('orderDTO') order: any, @Body('productDTO') products: any) {
        const product = await firstValueFrom(
            this.productClient.send('product_decreamentbyamount_order', {
                productID: order.productID,
                amount: order.amount
            })
        );
        if (product.status != HttpStatus.CREATED) {
            throw new HttpException(
                {
                    message: product.message,
                    data: null,
                    errors: product.errors
                },
                product.status
            );
        } else if (!product.data) return;

        return this.orderService.test();
    }

    // @Get('OrderTest')
    // public async TestOrder(@Query('test') test: string) {
    //     console.log('hehehehe');
    //     return this.orderService.test(test);
    // }

    @Get('/Test')
    public async test() {
        return 'heheehe';
    }
}
