import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CaloriesConsumedService } from './caloriesConsumed.service';
import { CreateCaloriesConsumedDto } from './dto/create-caloriesConsumed.dto';
import { PaginateResult } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Auth, CurrentUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import { CaloriesConsumed } from './entities/caloriesConsumed.entity';

@Auth()
@ApiTags('CaloriesConsumed')
@Controller('caloriesConsumed')
export class CaloriesConsumedController {
  constructor(
    private readonly caloriesConsumedService: CaloriesConsumedService,
  ) {}

  @Post()
  create(
    @Body() createCaloriesConsumedDto: CreateCaloriesConsumedDto,
    @CurrentUser() user: User,
  ) {
    return this.caloriesConsumedService.create(createCaloriesConsumedDto, user);
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @CurrentUser() user: User
  ): Promise<PaginateResult<CaloriesConsumed>> {
    return this.caloriesConsumedService.findAll(page, limit, user );
  }
}
