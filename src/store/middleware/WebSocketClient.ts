import SocketClient from './SocketClient';

export default class WebSocketClient implements SocketClient {
  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
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
