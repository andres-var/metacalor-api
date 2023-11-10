import { ApiProperty } from '@nestjs/swagger';
import{
    IsNotEmpty,
    IsString,
} from 'class-validator';


export class CreateDishDto {

    @ApiProperty({example :'Tacos'})
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString({each : true})
    aliments: string [];
}

