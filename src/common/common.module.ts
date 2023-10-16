import { Module } from '@nestjs/common';
import { BcryptAdapter } from './adapters/bcrypt.adapter';
import { DateAdapter } from './adapters/date.adapter';

@Module({
  providers: [BcryptAdapter, DateAdapter],
  exports: [BcryptAdapter, DateAdapter],
})
export class CommonModule {}
