import { Module } from '@nestjs/common';
import { UserController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { ConfigService as configServiceApplication } from './service/config/ConfigService.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env.test'
        })
    ],
    controllers: [UserController],
    providers: [AppService, configServiceApplication]
})
export class AppModule {}
