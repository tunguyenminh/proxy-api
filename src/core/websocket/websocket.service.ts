import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

import configuration from '../../common/configuration';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WebsocketService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getUserFromSocket(client: Socket) {
    const accessToken = client?.handshake?.query?.access_token?.toString();
    if (!accessToken) {
      throw new WsException('Invalid credentials!');
    }

    const authPayload = await this.jwtService.verifyAsync(accessToken, {
      secret: configuration().jwt.secret,
    });

    if (authPayload && authPayload.id) {
      const user = await this.userService.findOne({
        where: { id: authPayload.id },
      });
      if (user && user.id) {
        return user;
      }
    }

    throw new WsException('Unauthenticated!');
  }
}
