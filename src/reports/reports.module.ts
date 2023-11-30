import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

import { CaloriesConsumedModule } from 'src/caloriesConsumed/caloriesConsumed.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [CaloriesConsumedModule],
})
export class ReportsModule {}
