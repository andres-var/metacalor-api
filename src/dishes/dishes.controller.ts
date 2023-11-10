import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Auth, CurrentUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/common/pipes';

@ApiTags('Dishes')
@Controller('dishes') //ruta principal para platillos
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Auth()  
  @Post() //ruta para agregar platillos
  create(@Body() createDishDto: CreateDishDto, @CurrentUser() user:User) {
    return this.dishesService.create(createDishDto, user);
  }

  @Get()
  findAll() {
    return this.dishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseObjectIdPipe) id: string) {
    return this.dishesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishesService.update(id, updateDishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishesService.remove(+id);
  }
}
