import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';


export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;

    private logger: Logger;

    constructor() {
        // Load environment variables
        this.envConfig = {};
        this.envConfig.port = process.env.GATEWAYPORT || 8080;
        this.envConfig.productService = {
            options: {
                port: process.env.PRODUCT_PORT,
                host: process.env.PRODUCT_SERVICE_HOST
            },
            transport: Transport.TCP
        };
        this.envConfig.orderService = {
            options: {
                port: process.env.ORDER_PORT,
                host: process.env.ORDER_SERVICE_HOST
            },
            transport: Transport.TCP
        };
        this.envConfig.userService = {
            options: {
                port: process.env.USER_PORT,
                host: process.env.USER_SERVICE_HOST
            },
            transport: Transport.TCP
        };
    }
    get(key: string): any {
        return this.envConfig[key];
    }
}
