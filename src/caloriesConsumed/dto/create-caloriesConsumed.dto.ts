import { ApiProperty } from "@nestjs/swagger";

import {
    IsNotEmpty, 
    IsString, 
    IsNumber,
} from 'class-validator';
import { Macronutrients } from "src/macronutrients/entities/macronutrients.entity";

export class CreateCaloriesConsumedDto{

    @ApiProperty()
    @IsString({each: true})
    dish : string [];

    @ApiProperty()
    @IsString({each:true})
    aliments: string [];

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    calories: number;

    @ApiProperty()
    @IsNotEmpty()
    macronutrients: Macronutrients
}