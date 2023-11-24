import { Controller, Get, Param } from '@nestjs/common';
import { AlimentsService } from './aliments.service';
import { Auth } from 'src/auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/common/pipes';

@ApiTags('Aliments')
@Controller('aliments')
@Auth()
export class AlimentsController {
  constructor(private readonly alimentsService: AlimentsService) {}

  @Get()
  findAll() {
    return this.alimentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.alimentsService.findOne(id);
  }
}
