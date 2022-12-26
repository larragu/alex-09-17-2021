import { WebSocket as MockSocket } from 'mock-socket';
import SocketClient from '../store/middleware/SocketClient';

export class MockSocketClient implements SocketClient {
  private socket: MockSocket;
  constructor(url: string) {
    this.socket = new MockSocket(url);
  }
  onOpen(openHandler: () => void) {
    this.socket.onopen = openHandler;
  }

  onClose(closeHandler: (event: CloseEvent) => void) {
    this.socket.onclose = closeHandler;
  }

  onMessage(messageHandler: (message: MessageEvent) => void) {
    this.socket.onmessage = messageHandler;
  }

  close(eventCode: number) {
    this.socket.close(eventCode);
  }

  send(data: string) {
    this.socket.send(data);
  }

  isReady() {
    return this.socket.readyState === 1;
  }
}
