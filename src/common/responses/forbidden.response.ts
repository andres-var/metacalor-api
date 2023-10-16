import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenResponse {
    @ApiProperty({ example : 403 })
    statusCode : number;

    @ApiProperty({ example : "2023-03-02T19:48:29.633Z" })
    timestamp : string;

    @ApiProperty({ example : "/api/{route-name}" })
    path: string;

    @ApiProperty({ example : "Forbidden" })
    message: string;
}