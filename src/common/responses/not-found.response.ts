import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
    @ApiProperty({ example : 404 })
    statusCode : number = 404;

    @ApiProperty({ example : "2023-03-02T19:48:29.633Z" })
    timestamp : string;

    @ApiProperty({ example : "/api/{route-name}/63fad48806b7cf6162e1f287" })
    path: string;


    @ApiProperty({ example : "{entity} not found" })
    message: string;

    @ApiProperty({ example : "{route-name}.not-found" })
    key: string;

}