import { Controller, Get, Param } from '@nestjs/common';
import { AlimentsService } from './aliments.service';

@Controller('aliments')
export class AlimentsController {
  constructor(private readonly alimentsService: AlimentsService) {}

  @Get()
  findAll() {
    return this.alimentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alimentsService.findOne(+id);
  }
}
