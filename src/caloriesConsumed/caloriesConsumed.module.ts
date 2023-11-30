import { Module } from '@nestjs/common';
import { CaloriesConsumedService } from './caloriesConsumed.service';
import { CaloriesConsumedController } from './caloriesConsumed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CaloriesConsumed,
  CaloriesConsumedSchema,
} from './entities/caloriesConsumed.entity';
import { DishesModule } from 'src/dishes/dishes.module';
import { AlimentsModule } from 'src/aliments/aliments.module';

@Module({
  controllers: [CaloriesConsumedController],
  providers: [CaloriesConsumedService],
  imports: [
    MongooseModule.forFeature([
      { name: CaloriesConsumed.name, schema: CaloriesConsumedSchema },
    ]),
    DishesModule,
    AlimentsModule,
  ],
  exports: [MongooseModule],
})
export class CaloriesConsumedModule {}
