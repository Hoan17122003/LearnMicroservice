import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { from, throwError, timer } from 'rxjs';
import { retry, catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class RabbitMQService implements OnModuleInit {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'], // RabbitMQ URL
                queue: 'nestjs_queue', // Tên queue
                queueOptions: { durable: false }
            }
        });
    }

    async onModuleInit() {
        console.log('Initializing RabbitMQ Connection...');
        try {
            await this.retryConnect();
            console.log('Successfully connected to RabbitMQ!');
        } catch (err) {
            console.error('Failed to connect to RabbitMQ after retries:', err.message);
            throw err; // Thông báo lỗi đến NestJS để xử lý
        }
    }

    private async retryConnect(maxRetries = 5, retryDelayMs = 3000): Promise<void> {
        return from(this.client.connect()) // Chuyển từ Promise sang Observable
            .pipe(
                retry({
                    count: maxRetries,
                    delay: (error, retryAttempt) => {
                        console.log(`Retrying RabbitMQ connection... Attempt ${retryAttempt + 1}`);
                        return timer(retryDelayMs); // Chờ thời gian trước khi retry
                    }
                }),
                catchError((err) => {
                    console.error('RabbitMQ connection failed after retries:', err.message);
                    return throwError(() => err); // Ném lỗi khi hết số lần retry
                })
            )
            .toPromise(); // Chuyển từ Observable về Promise
    }

    // Example method to send messages
    async sendMessage(pattern: string, message: any): Promise<any> {
        return this.client.send(pattern, message).toPromise();
    }
}
