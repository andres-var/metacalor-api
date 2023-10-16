import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorador';

export class RegisterDto {
  @ApiProperty({ example: 'Jhon' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @MinLength(1)
  lastName: string;

  @ApiProperty({ example: 'jhoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Asdf123456' })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({ example: 'Asdf123456' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Match('password', { message: 'The passwords do not match' })
  passwordConfirm: string;

  @ApiProperty({ example: '2021-01-01' })
  @IsNotEmpty()
  @IsDate()
  birthday: Date;

  @ApiProperty({ example: 'male' })
  @IsNotEmpty()
  @IsIn(['male', 'female'])
  gender: string;

  @ApiProperty({ example: 1.65 })
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty({ example: 60.9 })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 22.4 })
  @IsNotEmpty()
  @IsNumber()
  imc: number;

  @ApiProperty({ example: 22.4 })
  @IsNotEmpty()
  @IsNumber()
  desiredCalorieConsumption: number;
}
