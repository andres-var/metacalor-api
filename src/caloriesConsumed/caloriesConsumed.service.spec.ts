import { Test, TestingModule } from '@nestjs/testing';
import { CaloriesConsumedService } from './caloriesConsumed.service';
import { CaloriesConsumed } from './entities/caloriesConsumed.entity';

describe('CaloriesConsumedService', () => {
    let service: CaloriesConsumedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CaloriesConsumedService],
        }).compile();

        service = module.get<CaloriesConsumedService>(CaloriesConsumedService);
    });

    it('should be defined', () =>{
        expect(service).toBeDefined();
    });
});