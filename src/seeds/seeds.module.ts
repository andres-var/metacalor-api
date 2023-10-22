import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { UsersSeeder } from './users.seeder';
import { UsersModule } from 'src/users/users.module';
import { AlimentsSeeder } from './aliments.seeder';
import { AlimentsModule } from 'src/aliments/aliments.module';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService, UsersSeeder, AlimentsSeeder],
  imports: [UsersModule, AlimentsModule],
})
export class SeedsModule {}
