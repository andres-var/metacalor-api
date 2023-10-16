import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class BaseQueryDto<T> {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page = 1;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(500)
  @Type(() => Number)
  limit = 30;

  @ApiProperty({ example: { name: 'asc' } })
  @IsOptional()
  sort: Record<keyof T, string>;

  @ApiProperty({ required: false })
  @IsOptional()
  fields: Record<string, boolean> = {};

  @ApiProperty()
  @IsOptional()
  filters: Record<keyof T, any>;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
