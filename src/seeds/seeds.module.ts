import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { UsersSeeder } from './users.seeder';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService, UsersSeeder],
  imports: [UsersModule],
})
export class SeedsModule {}
