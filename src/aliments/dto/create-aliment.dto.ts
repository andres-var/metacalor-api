import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlimentDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsNotEmpty()
  @IsNumber()
  grossWeight: number;

  @IsNotEmpty()
  @IsNumber()
  netWeight: number;

  @IsNotEmpty()
  @IsNumber()
  energyKcal: number;

  @IsNotEmpty()
  @IsNumber()
  protein: number;

  @IsNotEmpty()
  @IsNumber()
  lipids: number;

  @IsNotEmpty()
  @IsNumber()
  carbohydrates: number;
}
