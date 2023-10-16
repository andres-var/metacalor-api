import { PipeTransform, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class UserPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(id: string) {
    return this.usersService.findOne(id);
  }
}
