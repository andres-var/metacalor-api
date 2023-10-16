import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsIn,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Julio' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Hernandez' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'avargas@inprodi.com.mx' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Asdf123456' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({ example: '2021-01-01' })
  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty({ example: 'male' })
  @IsIn(['male', 'female'])
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: 1.65 })
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty({ example: 60.9 })
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @ApiProperty({ example: 22.4 })
  @IsNumber()
  @IsNotEmpty()
  imc: number;

  @ApiProperty({ example: 22.4 })
  @IsNumber()
  @IsNotEmpty()
  desiredCalorieConsumption: number;
}
