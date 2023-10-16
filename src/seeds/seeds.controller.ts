import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SeedsService } from './seeds.service';

@ApiTags('Seeds')
@ApiBearerAuth()
@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Get()
  runSeeds() {
    return this.seedsService.run();
  }
}
