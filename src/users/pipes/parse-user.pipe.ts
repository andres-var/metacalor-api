import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';

@Injectable()
export class ParseUserPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException({
        key: 'users',
        message: 'User not found',
      });
    }

    return user;
  }
}
