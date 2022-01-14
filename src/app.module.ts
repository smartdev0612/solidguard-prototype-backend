import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { ContractModule } from './contract/contract.module';
import { ExploitModule } from './exploit/exploit.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { BullModule } from '@nestjs/bull';
import { EmailNotificationModule } from './email-notification/email-notification.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        redis: {
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    ContractModule,
    ExploitModule,
    SubscribeModule,
    EmailNotificationModule,
    UserModule,
  ],
})
export class AppModule {}
