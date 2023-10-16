import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommonModule } from 'src/common/common.module';
import { User, UserSchema } from './entities/user.entity';
import { IsAlreadyEmailConstraint } from './constraints/is-already-email.constraint.ts';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsAlreadyEmailConstraint],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CommonModule,
  ],
  exports: [UsersService, IsAlreadyEmailConstraint],
})
export class UsersModule {}
