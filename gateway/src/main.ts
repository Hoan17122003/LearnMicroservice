import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './service/config/config.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    
    const app = await NestFactory.create(AppModule);
    await app.listen(new ConfigService().get('port'));
}
bootstrap();
