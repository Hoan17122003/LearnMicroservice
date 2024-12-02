import { ProductDTO } from './ProductDTO';

export class OrderDTO {
    venderID: number;
    buyerID: number;
    orderDate: Date;
    acceptTime: Date;
    shipperID: number;
    deliveryTime: Date;
    status: number;
    products: Array<ProductDTO>;
}
