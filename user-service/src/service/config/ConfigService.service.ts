import { Transport } from '@nestjs/microservices';
import { ConfigService as ConfigServiceLibary } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        this.envConfig = {
            ['USER_SERVICE_PORT']: Number.parseInt(process.env.USER_PORT),
            ['USER_SERVICE_HOST']: process.env.USER_SERVICE_HOST
        };
        this.envConfig.baseUri = process.env.BASE_URI;
        // this.envConfig.gatewayPort = configService.get('API_GATEWAY_PORT');
        // this.envConfig.mailerService = {
        //     options: {
        //         port: configService.get('MAILER_SERVICE_PORT'),
        //         host: configService.get('MAILER_SERVICE_HOST')
        //     },
        //     transport: Transport.TCP
        // };
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}
