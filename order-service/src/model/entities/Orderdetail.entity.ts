import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { OrderEntity } from './Order.entity';

@Entity('orderdetails')
export class OrderDetail extends BaseEntity {
    @PrimaryColumn({
        type: 'int',
        name: 'OrderID'
    })
    orderID: number;

    @PrimaryColumn({
        type: 'int'
    })
    productID: number;

    @Transform(({ value }) => (value < 0 ? 0 : value))
    @Column({
        type: 'int'
    })
    amount: number;

    @Column({
        type: 'decimal'
    })
    price: number;
    //relationship

    @ManyToOne(() => OrderEntity, (order) => order.orderdetails)
    @JoinColumn()
    order: OrderEntity;
}
