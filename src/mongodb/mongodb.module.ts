import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_NAME'),
        auth: {
          username: configService.get<string>('MONGODB_USERNAME'),
          password: configService.get<string>('MONGODB_PASSWORD'),
        },
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class MongoDBModule {}
