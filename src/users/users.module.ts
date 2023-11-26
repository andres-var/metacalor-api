import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommonModule } from 'src/common/common.module';
import { User, UserSchema } from './entities/user.entity';
import { IsAlreadyEmailConstraint } from './constraints/is-already-email.constraint.ts';
import { UsersCron } from './users.cron';
import {
  CaloriesConsumed,
  CaloriesConsumedSchema,
} from 'src/caloriesConsumed/entities/caloriesConsumed.entity';
import {
  CaloriesExpended,
  CaloriesExpendedSchema,
} from 'src/caloriesExpended/entities/caloriesExpended.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsAlreadyEmailConstraint, UsersCron],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: CaloriesConsumed.name, schema: CaloriesConsumedSchema },
      { name: CaloriesExpended.name, schema: CaloriesExpendedSchema },
    ]),
    CommonModule,
  ],
  exports: [UsersService, IsAlreadyEmailConstraint],
})
export class UsersModule {}
