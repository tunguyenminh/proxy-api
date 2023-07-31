import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import configuration from '../common/configuration';
import { UsersService } from '../users/users.service';
import { IUserJWT } from './interfaces';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { BackendConfigService } from 'src/services/backend-config.service';
import { UserRole, UserStatus } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: BackendConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getEnv('AUTH_JWT_ACCESS_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IJwtPayload) {
    let user: any;
    const accessToken = req.headers['authorization'].replace('Bearer ', '');
    user = await this.userService.findOne({
      where: {
        id: payload.sub,
      },
    });
    if (accessToken !== user.lastAccessToken) {
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }
    if (user.status === UserStatus.LOCK) {
      throw new HttpException('User has been locked', HttpStatus.UNAUTHORIZED);
    }

    return { data: user, role: UserRole.USER };
  }
}
