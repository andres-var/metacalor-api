import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from './entities/dish.entity';
import { AlimentsModule } from 'src/aliments/aliments.module';


@Module({
  controllers: [DishesController],
  providers: [DishesService],
  imports : [MongooseModule.forFeature([{name: Dish.name, schema: DishSchema}]),AlimentsModule]

})
export class DishesModule {}
