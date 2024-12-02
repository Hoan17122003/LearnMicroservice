import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, MessagePattern, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/model/entities/Order.entity';
import { OrderDetail } from 'src/model/entities/Orderdetail.entity';
// import { OrderRepository } from 'src/model/repository/order/OrderRepository';
// import { IOrderDetaillRepository } from 'src/model/repository/orderdetaill/IOrderDetaillRepository';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>
    ) {
        console.log('service check bug');
    }

    createOrder(order, products): Promise<OrderEntity> {
        // const orderEntity = this.orderRepository.create(order);
        // await this.orderDetailRepository.save
        return null;
    }
    public async test() {
        return 'order_test';
    }

    // public async test(test: string): Promise<string> {
    //     const result = await this.productService.send<string>('test_service_product', test).toPromise();
    //     return result;
    // }

    // @MessagePattern("")
}
