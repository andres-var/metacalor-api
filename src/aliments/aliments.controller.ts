import { Controller, Get, Param, Query } from '@nestjs/common';
import { AlimentsService } from './aliments.service';
import { Auth } from 'src/auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { BaseQueryDto } from 'src/common/dto';
import { Aliment } from './entities/aliment.entity';

@ApiTags('Aliments')
@Controller('aliments')
@Auth()
export class AlimentsController {
  constructor(private readonly alimentsService: AlimentsService) {}

  @Get()
  findAll(@Query() baseQueryDto: BaseQueryDto<Aliment>) {
    return this.alimentsService.findAll(baseQueryDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.alimentsService.findOne(id);
  }
}
