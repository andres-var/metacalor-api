import {Test, TestingModule} from '@nestjs/testing';
import { CaloriesConsumedController } from './caloriesConsumed.controller';
import { CaloriesConsumedService } from './caloriesConsumed.service';
import { CaloriesConsumed } from './entities/caloriesConsumed.entity';

describe( 'CaloriesConsumedController', () => {
    let controller: CaloriesConsumedController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CaloriesConsumedController],
            providers: [CaloriesConsumedService],
        }).compile();

        controller = module.get<CaloriesConsumedController>(CaloriesConsumedController);
    });
    it('should be defined', () =>{
        expect(controller).toBeDefined();
    });
});