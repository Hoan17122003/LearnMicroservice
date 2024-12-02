import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './Order.entity';

@Entity('orderstatus')
export class OrderStatus extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column({
        type: 'nvarchar',
        length: 20,
        nullable: false,
        unique: true,
        comment: 'Description of the status order'
    })
    description: string;
    @OneToMany(() => OrderEntity, (order) => order.orderstatus)
    @JoinColumn({
        name: 'status'
    })
    orders: Array<OrderEntity>;
}
