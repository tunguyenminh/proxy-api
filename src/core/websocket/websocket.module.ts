import { forwardRef, HttpException, HttpStatus, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule, UsersModule],
  controllers: [],
  providers: [WebsocketService, WebsocketGateway],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}
