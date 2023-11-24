import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Auth, CurrentUser } from 'src/auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { ParseObjectIdPipe } from 'src/common/pipes';

@ApiTags('Reminders')
@Controller('reminders')
@Auth()
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  create(
    @Body() createReminderDto: CreateReminderDto,
    @CurrentUser() user: User,
  ) {
    return this.remindersService.create(createReminderDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.remindersService.findAll(user);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User,
  ) {
    return this.remindersService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateReminderDto: UpdateReminderDto,
    @CurrentUser() user: User,
  ) {
    return this.remindersService.update(id, updateReminderDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User,
  ) {
    return this.remindersService.remove(id, user);
  }
}
