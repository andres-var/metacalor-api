import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query, ParseIntPipe } from '@nestjs/common';
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
  ) {
    const result = await this.dishesService.findAll(page, limit);
    return result;
  }

  @Get(':id')
  findOne(@Param('id',ParseObjectIdPipe) id: string) {
    return this.dishesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    const dish = await this.dishesService.findOne(id);
    if(!dish){
      throw new NotFoundException(`Dish with id ${id} not found`);
    }
    return this.dishesService.update(id, updateDishDto);
  }

  @Delete('delete')
  async deleteByName(@Body('name') name: string){
    const dish = await this.dishesService.findOneByName(name);
    
    return this.dishesService.remove(dish);
  }
 
}