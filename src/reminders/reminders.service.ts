import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { User } from 'src/users/entities/user.entity';
import { Reminder } from './entities/reminder.entity';

@Injectable()
export class RemindersService {
  private MAX_REMINDERS = 5;

  constructor(
    @InjectModel(Reminder.name) private reminderModel: Model<Reminder>,
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

  remove(id: string) {
    return `This action removes a #${id} reminder`;
  }
}
