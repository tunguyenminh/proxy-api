import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { BackendConfigService } from '../services/backend-config.service';
import { UserRole } from '@prisma/client';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: BackendConfigService,
  ) {}

  async hashPassword(password: string) {
    return await hash(
      password,
      parseInt(this.configService.getEnv('AUTH_SALT_ROUND')),
    );
  }

  async comparePassword(inputPassword: string, hashPassword: string) {
    return await compare(inputPassword, hashPassword);
  }

  async generateAccessToken(payload: IJwtPayload): Promise<string> {
    if (payload.role === UserRole.USER) {
      return await this.jwtService.signAsync(payload, {
        secret: this.configService.getEnv('AUTH_JWT_ACCESS_SECRET'),
      });
    }
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getEnv('AUTH_ADMIN_JWT_ACCESS_EXPIRES_IN'),
      secret: this.configService.getEnv('AUTH_JWT_ACCESS_SECRET'),
    });
  }
}
