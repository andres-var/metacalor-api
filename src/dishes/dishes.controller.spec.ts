import { Test, TestingModule } from '@nestjs/testing';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dish, DishDocument } from './entities/dish.entity';
import { User } from 'src/users/entities/user.entity';
import { DishSchema } from './entities/dish.entity';
import * as mongoose from 'mongoose';

describe('DishesController', () => {
  let controller: DishesController;
  let service: DishesService;
  let model: Model<DishDocument>;
  jest.setTimeout(60000);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DishesController],
      providers: [
        DishesService,
        {
          provide: getModelToken(Dish.name),
          useValue: mongoose.model<DishDocument>(Dish.name, DishSchema),
        },
      ],
    }).compile();

    controller = module.get<DishesController>(DishesController);
    service = module.get<DishesService>(DishesService);
    model = module.get<Model<DishDocument>>(getModelToken(Dish.name));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a dish by its ID and by User ID', async () => {
    const dishID = '656198325f00dbcf41b6df69';
    const user = { id: '654301f6f7ed7b1357133c60' } as User;

    const result = await controller.findOne(dishID, user);
    expect(result).toBeDefined();
  });

  // Puedes agregar más pruebas según sea necesario
});