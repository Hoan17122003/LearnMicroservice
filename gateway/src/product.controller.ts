import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';

@Controller('product')
export class ProductController {
    constructor(@Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy) {}
    @Get('test')
    public async TestProduct() {
        const response = await firstValueFrom(this.productService.send('product_test_gateway', {}));
        console.log(`repsosne : ${response} - status : ${response.status}`);
        return response;
    }
}
