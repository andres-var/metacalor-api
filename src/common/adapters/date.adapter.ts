import { Injectable } from '@nestjs/common';

@Injectable()
export class DateAdapter {
  start(date: Date): Date {
    return new Date(new Date(date).setUTCHours(0, 0, 0, 0));
  }

  end(date: Date): Date {
    return new Date(new Date(date).setUTCHours(23, 59, 59, 59));
  }
}
