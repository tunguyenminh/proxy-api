import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WebsocketService } from './websocket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly websocketService: WebsocketService) {}

  async handleConnection(client: Socket) {
    const user = await this.websocketService.getUserFromSocket(client);
    await client.join(user.id);
  }

  async sendMessage(room: string, event: string, message: any) {
    return this.server.to(room).emit(event, message);
  }
}
