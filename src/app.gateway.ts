import { UseFilters } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WebsocketFilter } from './websocket/websocket.filter';

@WebSocketGateway({
  path: '/ws',
  cors: {
    origin: '*',
  },
})
@UseFilters(WebsocketFilter)
export class AppGateway implements OnGatewayConnection {
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('connected :', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): string {
    console.log(client.id, { payload });
    return 'Hello world!';
  }

  @SubscribeMessage('test')
  handleTest(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): string {
    console.log(client.id, { payload });
    throw new WsException('You got an error');
  }
}
