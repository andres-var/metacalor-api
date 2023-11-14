import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'email',
  'password',
] as const) {}
