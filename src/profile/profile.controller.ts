import { Controller, Get, Body, Patch, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';

import { Auth, CurrentUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
@Auth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  me(@CurrentUser() user: User) {
    return this.profileService.me(user);
  }

  @Patch('me')
  update(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.profileService.update(user, updateUserDto);
  }

  @Delete('me')
  remove(@CurrentUser() user: User) {
    return this.profileService.remove(user);
  }
}
