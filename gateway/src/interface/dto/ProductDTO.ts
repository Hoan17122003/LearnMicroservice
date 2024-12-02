import { ProductAttributeDTO } from './ProductAttributeDTO';
import { ProductPhotoDTO } from './ProductPhotosDTO';

export class ProductDTO {
    // productID: number;
    productName: string;
    price: number;
    quanlity: number;
    description: string;
    productAttributes: Array<ProductAttributeDTO>;
    productPhotos: Array<ProductPhotoDTO>;
}
