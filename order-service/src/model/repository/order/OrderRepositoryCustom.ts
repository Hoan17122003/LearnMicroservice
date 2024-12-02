import { EntityRepository, Repository } from 'typeorm';
import { OrderEntity } from '../../entities/Order.entity';
import { IOrderRepositoryCustom } from './IOrderRepositoryCustom';

export class OrderRepositoryCustom implements IOrderRepositoryCustom {
    private orderRepository: Repository<OrderEntity>;

    // constructor() {
    //     const queryRunner = dataSource.createQueryRunner();
    //     if (queryRunner) console.log('queryRunner true');
    //     queryRunner.connect();
    //     this.orderRepository = dataSource.getRepository(OrderEntity);
    // }
}
