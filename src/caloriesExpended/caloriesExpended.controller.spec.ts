import { Test, TestingModule} from '@nestjs/testing';
import { CaloriesExpendedController } from './caloriesExpended.controller';
import { CaloriesExpendedService } from './caloriesExpended.service';
import { CaloriesExpended } from './entities/caloriesExpended.entity';

describe('CaloriesExpendedController', () => {
    let controller: CaloriesExpendedController;

    beforeEach(async() =>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CaloriesExpendedController], 
            providers: [CaloriesExpendedService],
        }).compile();
        
        controller = module.get<CaloriesExpendedController>(CaloriesExpendedController);
    });
    it('should be defined', () =>{
        expect(controller).toBeDefined();
    });
});