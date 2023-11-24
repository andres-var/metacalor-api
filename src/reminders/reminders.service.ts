import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { User } from 'src/users/entities/user.entity';
import { Reminder } from './entities/reminder.entity';
import { MailRemindersService } from 'src/mail/mail-reminders.service';

@Injectable()
export class RemindersService {
  private MAX_REMINDERS = 5;

  constructor(
    @InjectModel(Reminder.name) private reminderModel: Model<Reminder>,
    private mailRemindersService: MailRemindersService,
  ) {}
  async create(createReminderDto: CreateReminderDto, user: User) {
    const reminders = await this.findAll(user);

    if (reminders.length >= this.MAX_REMINDERS) {
      const message = `You can't have more than ${this.MAX_REMINDERS} reminders`;
      throw new BadRequestException(message);
    }

    const reminder = new this.reminderModel({
      ...createReminderDto,
      user,
    });

    await reminder.save();

    return reminder;
  }

  async findAll(user: User) {
    return await this.reminderModel.find({ user }).exec();
  }

  async findOne(id: string, user: User) {
    const reminder = await this.reminderModel.findOne({ _id: id, user }).exec();

    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }

    return reminder;
  }

  async update(id: string, updateReminderDto: UpdateReminderDto, user: User) {
    await this.findOne(id, user);

    const reminder = await this.reminderModel
      .findOneAndUpdate({ _id: id }, { $set: updateReminderDto }, { new: true })
      .exec();

    return reminder;
  }

  async remove(id: string, user: User) {
    const reminder = await this.findOne(id, user);

    const result = await this.reminderModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Reminder not found');
    }

    return reminder;
  }

  async sendEmails() {
    const reminders = await this.reminderModel
      .find({}, {}, { populate: ['user'] })
      .exec();
    const now = new Date().toLocaleString(undefined, {
      timeZone: 'America/Mexico_City',
    });

    const hour = Number(now.split(' ')[1].split(':')[0]);

    if (reminders.length === 0) return;

    const sendEmailPromises = reminders.map(async (reminder) => {
      const reminderHour = Number(reminder.hour.split(':')[0]);

      if (reminderHour === hour) {
        await this.mailRemindersService.send(reminder.user, reminder.name);
        console.log('Email sent');
      }
    });

    try {
      await Promise.all(sendEmailPromises);
    } catch (error) {
      console.log(error);
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  handleCron() {
    this.sendEmails();
  }
}
