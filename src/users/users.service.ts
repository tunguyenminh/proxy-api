import { Injectable } from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(args: Prisma.UserFindFirstArgsBase): Promise<User> {
    return this.prismaService.user.findFirst(args);
  }
  async create(createArgs: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createArgs);
  }
}
