import { UserRole } from '@prisma/client';

export class IJwtPayload {
  sub: string;

  iat?: number;

  exp?: number;

  role: UserRole;
}
