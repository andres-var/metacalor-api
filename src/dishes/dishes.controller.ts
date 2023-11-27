import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query, ParseIntPipe, InternalServerErrorException } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { Dish, DishSchema } from './entities/dish.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Auth, CurrentUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { IsMongoId } from 'class-validator';

@Auth()
@ApiTags('Dishes')
@Controller('dishes') //ruta principal para platillos
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}


  @Post() //ruta para agregar platillos
  create(@Body() createDishDto: CreateDishDto, @CurrentUser() user:User) {
    return this.dishesService.create(createDishDto, user);
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @CurrentUser() user: User
  ) {
    const result = await this.dishesService.findAll(page, limit, user);
    return result;
  }

  @Get(':id')
  findOne(@Param('id',ParseObjectIdPipe) id: string,
          @CurrentUser() user: User) {
    return this.dishesService.findOne(id, user);
  }

  @Patch(':id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: User, @Body() updateDishDto: UpdateDishDto) {
    await this.dishesService.findOne(id, user);
    return this.dishesService.update(id, updateDishDto);
  }


  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe)id: string, @CurrentUser() user: User){
      await this.dishesService.findOne(id, user);
      await this.dishesService.remove(id);
      return { message: 'Dish deleted successfully'};
  }
}