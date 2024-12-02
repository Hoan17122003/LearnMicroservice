import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigServiceLibary } from '@nestjs/config';

export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        this.envConfig = {
            ['ORDER_PORT']: Number.parseInt(process.env.ORDER_PORT),
            ['ORDER_SERVICE_HOST']: process.env.ORDER_SERVICE_HOST
        };
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}
