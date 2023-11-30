import { Test, TestingModule } from '@nestjs/testing';
import { DishesService } from './dishes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Dish } from './entities/dish.entity';
import { User } from 'src/users/entities/user.entity';
import { Aliment } from 'src/aliments/entities/aliment.entity';
import { NotFoundException } from '@nestjs/common';

describe('DishesService', () => {
  let service: DishesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DishesService,
        {
          provide: getModelToken(Dish.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken(Aliment.name),
          useValue:{
            exists: jest.fn().mockResolvedValue(true),
          }
        }
      ],
    }).compile();

    service = module.get<DishesService>(DishesService);
  });
/*
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a dish', async () => {
    const alimentsMock: string[] = [
      '654302b7f7ed7b1357134518',
      '65430320f7ed7b13571359b0',
      '654302aff7ed7b1357134376',
      '654302edf7ed7b1357134f92',
      '6543034df7ed7b1357136298',
    ];

    const dish = {
      name: 'Taco',
      aliments: alimentsMock,
      user: new User(),
    };

    jest.spyOn(service, 'create').mockImplementation(async () => dish as unknown as Dish);
    const result = (await service.create(dish, dish.user));
    console.log(result);
    expect(await service.create(dish, dish.user)).toBe(dish);
  });

  it('should fail to create a dish', async () => {
    const dish = {
      name: '', // nombre vacío para que falle la validación
      aliments: ['654302b7f7ed7b1357134518', '65430320f7ed7b13571359b0', '654302aff7ed7b1357134376', '654302edf7ed7b1357134f92', '6543034df7ed7b1357136298'],
      user: new User(),
    };
  
    jest.spyOn(service, 'create').mockImplementation(async () => {
      throw new Error('Validation failed');
    });
  
    try {
      await service.create(dish, dish.user);
    } catch (error) {
      expect(error.message).toBe('Validation failed');
      console.log(error);
    }
  });

  it('should fail to create a dish with invalid aliment ID', async () => {
    const dish = {
      name: 'Taco',
      aliments: ['654302b7f34ghb3278964518', '65adyut45f34ghb3278964518', '65adyf34ghb3dghgty5964518'], // ID de alimento inválido
      user: new User(),
    };
  
    const errorMessage = `Aliment with Id ${dish.aliments[0]} does not exist`;

    jest.spyOn(service, 'create').mockImplementation(async () => {
      throw new Error(errorMessage);
    });

    await expect(service.create(dish, dish.user)).rejects.toThrow(errorMessage);
    console.log(errorMessage);
  });

  it('should find a dish by valid ID', async () => {
    const dishId = '65651c8f4de76a523cf15e34';
    const dishMock = {
      _id: dishId,
      name: 'Taco',
      aliments: ['654302a8f7ed7b1357134291','654302a9f7ed7b13571342a2', '654302a9f7ed7b13571342a8'],
      user: new User(),
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(dishMock as unknown as Dish);

    const foundDish = await service.findOne(dishId);
    console.log (foundDish); 
    expect(foundDish).toBe(dishMock as unknown as Dish);
  });
 
  it('should fail to find a dish by invalid ID', async () => {
    const dishId = '654302a9f7ed7b13571342a';
  
    jest.spyOn(service, 'findOne').mockImplementation(() => {
      throw new NotFoundException(`Dish with id ${dishId} not found`);
    });
  
    try {
      await service.findOne(dishId);
    } catch (error) {
      console.log(error.message); // Imprime el mensaje de error en la consola
      expect(error.message).toBe(`Dish with id ${dishId} not found`);
    }
  });
*/
/*
  it('should update a dish', async() =>{
    const dishId = '65651c8f4de76a523cf15e34';
    const updatedDish={
      name: 'New Taco',
      aliments: ['654302b7f7ed7b1357134518','654302edf7ed7b1357134f92','6543034df7ed7b1357136298']
    };
    const newDish={
      _id: dishId,
      ...updatedDish,
      user: new User()
    };
    jest.spyOn(service, 'update').mockResolvedValue(newDish as unknown as Dish);
    const result = await service.update(dishId, updatedDish);
    expect(result).toEqual(newDish);
    console.log(result);
   });
   */
   it('should fail to update a dish with invalid aliment ID', async() =>{
    const dishID = '65651c8f4de76a523cf15e34';
    const updatedDish = {
      name: 'Taco nuevo',
      aliments: ['654302a9f7ed7b13571342a8', '678452a9f7ed7b78451342a8'],
    };
    const errorMessage = `Aliment with id 678452a9f7ed7b78451342a8 doesnt exist`;

    jest.spyOn(service, 'update').mockImplementation(async () =>{
      throw new Error(errorMessage);
    });
    await expect(service.update(dishID, updatedDish)).rejects.toThrow(errorMessage);
    console.log(errorMessage);
   });
});
