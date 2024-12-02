import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigServiceLibary } from '@nestjs/config';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        this.envConfig = {
            ['PRODUCT_PORT']: Number.parseInt(process.env.PRODUCT_PORT),
            ['PRODUCT_SERVICE_HOST']: Number.parseInt(process.env.PRODUCT_SERVICE_HOST)
        };
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}
