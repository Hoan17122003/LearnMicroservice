import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
}
