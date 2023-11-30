import { Test, TestingModule } from '@nestjs/testing';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { User } from 'src/users/entities/user.entity';
import { Dish, DishSchema } from './entities/dish.entity';
import { Model, Schema } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { DishesModule } from './dishes.module';
import * as mongoose from 'mongoose';


describe('DishesController', () => {
  let controller: DishesController;
  let service: DishesService; 
  let model: Schema<Dish>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DishesModule],
      controllers: [DishesController],
      providers: [DishesService,{
        provide: getModelToken(Dish.name),
        useValue: mongoose.model(Dish.name, DishSchema),
      }],
    }).compile();

    controller = module.get<DishesController>(DishesController);
    service = module.get<DishesService>(DishesService);
    //model = module.get<Model<Dish>>(getModelToken(Dish.name));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a dish by its ID and by User ID', async ()=>{
    const dishID= '6563ed84597ddee6fcd1b94f';
    const userID = {id: '654301f6f7ed7b1357133c60'} as User;
    const result = await controller.findOne(dishID, userID);
    expect (result).toBeDefined();
  });


});
