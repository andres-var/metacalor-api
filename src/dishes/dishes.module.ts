import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from './entities/dish.entity';
import { AlimentsModule } from 'src/aliments/aliments.module';
import { AlimentsService } from 'src/aliments/aliments.service';
import { AlimentSchema } from 'src/aliments/entities/aliment.entity';
import { Aliment } from 'src/aliments/entities/aliment.entity';

@Module({
  controllers: [DishesController],
  providers: [DishesService, AlimentsService],
  imports: [
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema },
      {name: Aliment.name, schema: AlimentSchema},]), AlimentsModule,
  ],
  exports: [DishesService],
})
export class DishesModule {}

