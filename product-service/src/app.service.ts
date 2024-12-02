import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './model/entites/Product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './interface/dto/ProductDTO';

@Injectable()
export class AppService {
    // constructor(@Inject('USER_RABBITMQ') private readonly userClient: ClientProxy) {}
    constructor(@InjectRepository(Product) private readonly repository: Repository<Product>) {}

    @MessagePattern('test_service_product')
    getHello(test: string): string {
        return 'Hello World!';
    }

    async save(productDTO: ProductDTO) {
        return this.repository.save(productDTO);
    }
    public async getAllProduct(): Promise<Array<Product>> {
        const result = await this.repository.find();
        return result;
    }
}
