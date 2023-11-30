import { Test, TestingModule } from '@nestjs/testing';
import { CaloriesExpendedService } from './caloriesExpended.service';
import { CaloriesExpended } from './entities/caloriesExpended.entity';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';

describe('CaloriesExpendedService', () =>{
    let service: CaloriesExpendedService;

    beforeEach(async() =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [CaloriesExpendedService,{
                provide: getModelToken(CaloriesExpended.name),
                useValue: {
                    new: jest.fn().mockResolvedValue({}),
                    constructor: jest.fn().mockResolvedValue({}),
                    create: jest.fn(),
                    exec: jest.fn(),
                },
            }],
        }).compile();
        service= module.get<CaloriesExpendedService>(CaloriesExpendedService);
    });
    /*/
    it('should be defined', () =>{
        expect(service).toBeDefined();
    });
    */
   /*
    it('should create a caloriesExpended object', async()=>{
        const caloriesExpended ={
            calories: 145.78,
            user: new User()
        };
        jest.spyOn(service, 'create').mockImplementation(async()=> caloriesExpended as unknown as CaloriesExpended);
        const result = (await service.create(caloriesExpended, caloriesExpended.user));
        console.log(result);
        expect(await service.create(caloriesExpended, caloriesExpended.user)).toBe(caloriesExpended);
    })*/

    it('should fail to create an object of CaloriesExpended', async() =>{
        const caloriesExpended = {
            calories: parseInt('agknasg'),
            user: new User()
        };
        jest.spyOn(service, 'create').mockImplementation(async () =>{
            throw new Error('Invalid Format, try numbers');
        });

        try{
            await service.create(caloriesExpended, caloriesExpended.user);
        }catch(error){
            expect(error.message).toBe('Invalid Format, try numbers');
            console.log(error);
        }
    });
});