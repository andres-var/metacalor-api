import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsAlreadyEmailConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) return false;

    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const email = validationArguments.value;
    const property = validationArguments.property;

    return `${property} ${email} is already exist`;
  }
}
