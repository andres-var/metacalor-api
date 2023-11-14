import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class ProfileService {
  constructor(private usersService: UsersService) {}

  async me(user: User) {
    return await this.usersService.findOne(user.id);
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    return await this.usersService.update(user.id, updateUserDto);
  }

  async remove(user: User) {
    return await this.usersService.remove(user.id);
  }
}
