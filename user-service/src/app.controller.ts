// api-gateway/src/user/user.controller.ts
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get()
  async getUsers() {
    // Gửi yêu cầu đến user-service qua RabbitMQ
    return this.userServiceClient.send('get_users', {});
  }
}
