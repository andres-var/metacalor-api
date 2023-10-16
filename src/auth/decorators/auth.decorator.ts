import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserRoleGuard } from '../guards/user-role.guard';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ForbiddenResponse } from 'src/common/responses/forbidden.response';
import { UnauthorizedResponse } from 'src/common/responses/unauthorized.response';

export function Auth() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiForbiddenResponse({
      description: ' Forbidden Users',
      type: ForbiddenResponse,
    }),
    ApiUnauthorizedResponse({
      description: ' Unauthorized Users',
      type: UnauthorizedResponse,
    }),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
}
