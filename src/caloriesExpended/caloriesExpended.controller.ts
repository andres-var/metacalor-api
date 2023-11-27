import { Controller, Post, Get, Query } from '@nestjs/common';
import { CaloriesExpendedService } from './caloriesExpended.service';
import { CreateCaloriesExpendedDto } from './dto/create-caloriesExpended.dto';
import { PaginateResult } from 'mongoose';
import { Auth, CurrentUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import { CaloriesExpended } from './entities/caloriesExpended.entity';
import { ApiTags } from '@nestjs/swagger';
import { Body } from '@nestjs/common';

@Auth()
@ApiTags('CaloriesExpended')
@Controller('caloriesExpended')
export class CaloriesExpendedController {
  constructor(
    private readonly caloriesExpendedService: CaloriesExpendedService,
  ) {}

  @Post()
  create(
    @Body() createCaloriesExpendedDto: CreateCaloriesExpendedDto,
    @CurrentUser() user: User,
  ) {
    return this.caloriesExpendedService.create(createCaloriesExpendedDto, user);
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @CurrentUser() user: User
  ): Promise<PaginateResult<CaloriesExpended>> {
    return this.caloriesExpendedService.findAll(page, limit, user);
  }
}
