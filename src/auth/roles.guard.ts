import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRoleEnum } from 'src/users/enums/user-role.enum';
import { IUserJWT } from './interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: IUserJWT = request.user;
    return (
      (Object.values(UserRoleEnum) as string[]).indexOf(user.userRole) > -1
    );
  }
}
