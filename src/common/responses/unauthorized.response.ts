import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponse {
    @ApiProperty({ example : 401 })
    statusCode : number;

    @ApiProperty({ example : "2023-03-02T19:48:29.633Z" })
    timestamp : string;

    @ApiProperty({ example : "/api/{route-name}" })
    path: string;

    @ApiProperty({ example : "Unauthorized" })
    message: string;
}