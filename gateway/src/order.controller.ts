import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderDTO } from './interface/dto/OrderDTO';
import { ProductDTO } from './interface/dto/ProductDTO';
import axios, { Axios } from 'axios';
import { firstValueFrom } from 'rxjs';

@Controller('order')
export class OrderController {
    constructor(@Inject('ORDER_SERVICE') private readonly orderService: ClientProxy) {}

    @Post('Save')
    public async createOrder(
        @Body('order') order: OrderDTO,
        @Body('product') products: Array<ProductDTO>
    ): Promise<ResponseObject> {
        const response = await firstValueFrom(this.orderService.send('create_order_by_vender', {}));
        if (response.status != HttpStatus.CREATED) {
            throw new HttpException(
                {
                    message: response.message,
                    data: null,
                    errors: response.errors
                },
                response.status
            );
        }
        return {
            message: 'create order success',
            status: HttpStatus.CREATED,
            data: response.data
        } as ResponseObject;
    }

    public async updateOrder(): Promise<ResponseObject> {
        const result = {} as ResponseObject;
        return result;
    }

    @Get('hehe')
    public async TestController(): Promise<string> {
        const response = await axios.get('http://order-service:8085/OrderTest?test=hehehe', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    @Get('test')
    public async test() {
        return 'test';
    }
}
