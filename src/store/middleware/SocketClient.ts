export default interface SocketClient {
  onOpen: (openHandler: () => void) => void;
  onClose: (closeHandler: (event: CloseEvent) => void) => void;
  onMessage: (messageHandler: (message: MessageEvent) => void) => void;
  close: (eventCode: number) => void;
  send: (data: string) => void;
  isReady: () => boolean;
}
