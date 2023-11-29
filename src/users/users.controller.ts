import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators';
import { User } from './entities/user.entity';
import { NotFoundResponse } from 'src/common/responses/not-found.response';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { BaseQueryDto } from 'src/common/dto';

@ApiTags('Users')
@Controller('users')
@Auth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get Users', type: User })
  async findAll(@Query() baseQueryDto: BaseQueryDto<User>) {
    const users = await this.usersService.findAll(baseQueryDto);

    return users;
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get User', type: User })
  @ApiNotFoundResponse({
    description: 'Not Found User',
    type: NotFoundResponse,
  })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    const user = await this.usersService.findOne(id);

    return user;
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update User', type: User })
  @ApiResponse({
    status: 404,
    description: 'Not Found User',
    type: NotFoundResponse,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}
