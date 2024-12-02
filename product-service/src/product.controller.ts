import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { ProductDTO } from './interface/dto/ProductDTO';
import { firstValueFrom } from 'rxjs';

@Controller('ProductService')
export class ProductController {
    constructor(
        private readonly appService: AppService,
        @Inject('USER_RABBITMQ') private readonly userClient: ClientProxy
    ) {}

    @MessagePattern('product_test_gateway')
    public async test(): Promise<string> {
        const messageSend = 'product rabbitmq send message';
        const response = await firstValueFrom(this.userClient.send('user_test_rabbitmq', messageSend));
        return `product test - ${response}`;
    }

    @Post('/CreateProduct')
    public async CreateProduct(@Body() product: ProductDTO) {
        return this.appService.save(product);
    }
    @Get()
    public async GetAllProduct() {
        return this.appService.getAllProduct();
    }
    @Get('/Test')
    public async Test() {
        return 'hehehe';
    }
}
