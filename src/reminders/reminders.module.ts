import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reminder, ReminderSchema } from './entities/reminder.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [RemindersController],
  providers: [RemindersService],
  imports: [
    MongooseModule.forFeature([
      { name: Reminder.name, schema: ReminderSchema },
    ]),
    MailModule,
  ],
})
export class RemindersModule {}
