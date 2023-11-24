import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { MongoDBModule } from './mongodb/mongodb.module';
import { SeedsModule } from './seeds/seeds.module';
import { MailModule } from './mail/mail.module';
import { AlimentsModule } from './aliments/aliments.module';
import { DishesModule } from './dishes/dishes.module';
import { ProfileModule } from './profile/profile.module';
import { RemindersModule } from './reminders/reminders.module';
import { CaloriesConsumedModule } from './caloriesConsumed/caloriesConsumed.module';
import { CaloriesExpendedModule } from './caloriesExpended/caloriesExpended.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    MongoDBModule,
    CommonModule,
    SeedsModule,
    MailModule,
    AuthModule,
    UsersModule,
    AlimentsModule,
    DishesModule,
    ProfileModule,
    RemindersModule,
    CaloriesConsumedModule,
    CaloriesExpendedModule,
  ],
})
export class AppModule {}
