import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WebsocketFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ws = host.switchToWs();
    console.log({
      client: ws.getClient(),
      data: ws.getData(),
      pattern: ws.getPattern(),
    });
  }
}
