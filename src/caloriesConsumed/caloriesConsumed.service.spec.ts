import { Test, TestingModule } from '@nestjs/testing';
import { CaloriesConsumedService } from './caloriesConsumed.service';
import { CaloriesConsumed } from './entities/caloriesConsumed.entity';
import { getModelToken } from '@nestjs/mongoose';
import { Aliment } from 'src/aliments/entities/aliment.entity';
import { Dish } from 'src/dishes/entities/dish.entity';
import { User } from 'src/users/entities/user.entity';

describe('CaloriesConsumedService', () => {
    let service: CaloriesConsumedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CaloriesConsumedService,{
                provide: getModelToken(CaloriesConsumed.name),
                useValue: {
                    new: jest.fn().mockResolvedValue({}),
                    constructor: jest.fn().mockResolvedValue({}),
                    create: jest.fn(),
                    exec: jest.fn(),
                },
            },
            {
                provide: getModelToken(Dish.name, Aliment.name),
                useValue:{
                    exists: jest.fn().mockResolvedValue(true),
                }
            }
        ],
        }).compile();

        service = module.get<CaloriesConsumedService>(CaloriesConsumedService);
    });
    /*
    it('should be defined', () =>{
        expect(service).toBeDefined();
    });
    */

    /*
   it ('should create a caloriesConsumed object', async () =>{

        const dishesConsumedMock: string[] = [
            '65653b4d2d6b7de7b5067156'
        ];

        const alimentsConsumedMock: string[] = [
            '654302b7f7ed7b1357134518',
            '654302aff7ed7b1357134376',
            '6543034df7ed7b1357136298'
        ];

        const caloriesConsumed = {
            dish: dishesConsumedMock,
            aliments: alimentsConsumedMock, 
            calories: 12,
            macronutrients : {
                lipids: 45.12,
                proteins: 78.45,
                carbohydrates: 123.78
            },
            user: new User(), 
    
        };
        jest.spyOn(service, 'create').mockImplementation(async () => caloriesConsumed as unknown as CaloriesConsumed);
        const result = (await service.create(caloriesConsumed, caloriesConsumed.user));
        console.log(result);
        expect(await service.create(caloriesConsumed, caloriesConsumed.user)).toBe(caloriesConsumed);
   });
   */
   it('should fail to create an object of calories Consumed', async() =>{
 
    const caloriesConsumed = {
        dish: ['654302b7f34ghb3278964518'],
        aliments: ['654302b124gd7b1357134518',
        '789452aff7ed7b1357134376',
        'd7845f4df7ed7b1357136298'],
        calories: 145.78,
        macronutrients :{
            lipids: 47.12,
            proteins: 25.48, 
            carbohydrates: 123.45, 
        },
        user: new User(),
    };
    
    jest.spyOn(service, 'create').mockImplementation(async () =>{
        throw new Error('Aliments arent in database');
    });

    try{
        await service.create(caloriesConsumed, caloriesConsumed.user);
    }catch(error){
        expect(error.message).toBe('Aliments arent in database');
        console.log(error);
    }

   })

});