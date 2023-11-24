import { IsNumber,
         IsNotEmpty,    
} from "class-validator";  

import { ApiProperty } from "@nestjs/swagger";

export class CreateCaloriesExpendedDto{

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: '171.20'})
    calories: number;
}