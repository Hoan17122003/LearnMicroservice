import { EntityRepository, Repository } from "typeorm";
import { OrderDetail } from "../../entities/Orderdetail.entity";
import { IOrderDetaillRepositoryCustom } from "./IOrderDetaillRepositoryCustom";

// @EntityRepository(OrderDetail)
export interface IOrderDetaillRepository extends Repository<OrderDetail>,IOrderDetaillRepositoryCustom {

}