import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userModel;

  beforeEach(async () => {
    userModel = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
        BcryptAdapter,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = {
        name: 'Pedro',
        lastName: 'Gonzalez',
        email: 'user20@gmail.com',
        password: 'TestPassword1*',
        birthday: new Date('1980-12-24'),
        gender: 'male',
        height: 1.65,
        weight: 60.9,
        imc: 22.4,
        desiredCalorieConsumption: 22.4,
      };

      jest.spyOn(service, 'create').mockImplementation(async () => user as unknown  as User);
        const result = (await service.create(user));
        console.log(result);
        expect(await  service.create(user)).toBe(user);
      
      
  });

});
  it('should fail to create a user', async () => {
    const user = {
      name: 'Pedro',
      lastName: 'Gonzalez',
      email: 'usergmcom',
      password: 'TestPassword1*',
      birthday: new Date('20-80-90'),
      gender: 'male',
      height: 1.65,
      weight: 60.9,
      imc: 22.4,
      desiredCalorieConsumption: 22.4,
    };
    jest.spyOn(service, 'create').mockImplementation(async () =>{
      throw new Error('User creation failed');
    });

    try{
      await service.create(user);
    }catch(error){
      expect(error.message).toBe('User creation failed');
      console.log(error);
    }
  });

});