import {Module} from '@nestjs/common';
import { CaloriesConsumedService } from './caloriesConsumed.service';
import { CaloriesConsumedController } from './caloriesConsumed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {CaloriesConsumed, CaloriesConsumedSchema} from './entities/caloriesConsumed.entity';
import { DishesModule } from 'src/dishes/dishes.module';
import { AlimentsModule } from 'src/aliments/aliments.module';
import { DishesService } from 'src/dishes/dishes.service';

@Module({
    controllers: [CaloriesConsumedController],
    providers: [CaloriesConsumedService],
    imports: [MongooseModule.forFeature([{name: CaloriesConsumed.name, schema: CaloriesConsumedSchema}]), DishesModule, AlimentsModule,],
})

export class CaloriesConsumedModule{}