import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators';
import { User } from './entities/user.entity';
import { NotFoundResponse } from 'src/common/responses/not-found.response';

@ApiTags('Users')
@Controller('users')
@Auth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get User', type: User })
  @ApiNotFoundResponse({
    description: 'Not Found User',
    type: NotFoundResponse,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
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
