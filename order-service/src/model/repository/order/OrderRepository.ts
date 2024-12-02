import { EntityRepository, Repository } from "typeorm";
import { OrderEntity } from "../../entities/Order.entity";
import { IOrderRepositoryCustom } from "./IOrderRepositoryCustom";

// @EntityRepository(OrderEntity)
export interface OrderRepository extends Repository<OrderEntity>,IOrderRepositoryCustom {
    
}