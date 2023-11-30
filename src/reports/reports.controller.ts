import { Controller, Get, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Auth, CurrentUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';

@Auth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.reportsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }
}
