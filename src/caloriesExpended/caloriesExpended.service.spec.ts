import { Test, TestingModule } from '@nestjs/testing';
import { CaloriesExpendedService } from './caloriesExpended.service';
import { CaloriesExpended } from './entities/caloriesExpended.entity';

describe('CaloriesExpendedService', () =>{
    let service: CaloriesExpendedService;

    beforeEach(async() =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [CaloriesExpendedService],
        }).compile();
        service= module.get<CaloriesExpendedService>(CaloriesExpendedService);
    });

    it('should be defined', () =>{
        expect(service).toBeDefined();
    });
});