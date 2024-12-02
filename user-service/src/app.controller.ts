// api-gateway/src/user/user.controller.ts
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UserController {
    constructor() {} // @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,

    @Get()
    async getUsers() {
        // Gửi yêu cầu đến user-service qua RabbitMQ
        // return this.userServiceClient.send('get_users', {});
    }

    @MessagePattern('user_test_rabbitmq')
    public async TestRabbitmqForUser(@Payload() payload: any) {
        return `user response - ${payload} `;
    }
}
