import { Injectable } from '@nestjs/common';

import { faker } from '@faker-js/faker';
import { Promise as Bluebird } from 'bluebird';

import { SeederInterface } from './interfaces';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class UsersSeeder implements SeederInterface {
  constructor(private readonly usersService: UsersService) {}

  async seed() {
    const data: CreateUserDto[] = [];

    for (let i = 0; i < 200; i++) {
      data.push({
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: `user${i}@metacalor.com.mx`,
        password: 'Asdf123456',
        birthday: faker.date.past(),
        height: faker.datatype.float({ min: 1.5, max: 2.0 }),
        weight: faker.datatype.float({ min: 50, max: 100 }),
        imc: faker.datatype.float({ min: 18, max: 30 }),
        desiredCalorieConsumption: faker.datatype.float({
          min: 1000,
          max: 3000,
        }),
        gender: faker.name.sexType(),
      });
    }

    await Bluebird.each(data, async (data) => {
      const user = await this.usersService.create({ ...data });
      await this.usersService.patchIsVerified(user.id);
    });
  }
}
