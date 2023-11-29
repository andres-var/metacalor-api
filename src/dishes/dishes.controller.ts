import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Auth, CurrentUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { BaseQueryDto } from 'src/common/dto';
import { Dish } from './entities/dish.entity';

@Auth()
@ApiTags('Dishes')
@Controller('dishes') //ruta principal para platillos
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post() //ruta para agregar platillos
  create(@Body() createDishDto: CreateDishDto, @CurrentUser() user: User) {
    return this.dishesService.create(createDishDto, user);
  }

  @Get()
  async findAll(
    @Query() baseQueryDto: BaseQueryDto<Dish>,
    @CurrentUser() user: User,
  ) {
    const result = await this.dishesService.findAll(baseQueryDto, user);
    return result;
  }

  @Get(':id')
  findOne(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: User,
  ) {
    return this.dishesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateDishDto: UpdateDishDto,
    @CurrentUser() user: User,
  ) {
    await this.dishesService.findOne(id);
    return this.dishesService.update(id, updateDishDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    await this.dishesService.findOne(id);
    await this.dishesService.remove(id);
    return { message: 'Dish deleted successfully' };
  }
}
