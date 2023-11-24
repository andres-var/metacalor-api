import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsNumber,
} from 'class-validator';

export class CreateMacronutrientsDto{
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example: 7.25})
    lipids: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example: 4.89})
    proteins: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example: 6.45})
    carbohydrates: number; 
}