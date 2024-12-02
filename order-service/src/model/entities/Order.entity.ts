import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetail } from './Orderdetail.entity';
import { OrderStatus } from './OrderStatus.entity';

@Entity('orders')
export class OrderEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    orderID: number;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    orderDate: Date;

    @Column({
        type: 'datetime',
        nullable: true,
        default: null
    })
    acceptTime: Date;

    @Column({
        type: 'int',
        nullable: false
    })
    buyerID: number;

    @Column({
        type: 'int',
        nullable: false
    })
    venderID: number;

    @Column({
        type: 'int',
        nullable: false
    })
    shipperID: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    status: number;

    @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders)
    orderstatus: OrderStatus;
    // relationship
    @OneToMany(() => OrderDetail, (orderdetail) => orderdetail.order)
    @JoinColumn({
        name: 'orderID'
    })
    orderdetails: Array<OrderDetail>;
}
