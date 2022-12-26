import { Market, SocketEvent, SocketEventData } from '../../types';
import { changeMarket, processSocketData } from '../feed-slice';
import {
  connectError,
  connectSuccess,
  disconnectSuccess,
  subscribeSuccess,
  unsubscribeSuccess,
} from '../socket-slice';
import { AppDispatch } from '../';
import SocketClient from './SocketClient';
class OrderbookSocket {
  private readonly NEW_MARKET = 0;
  private readonly NORMAL_CLOSURE = 1000;
  private readonly FEED = 'book_ui_1';
  private readonly SIZE = 1;
  private readonly TIMEOUT = 5000;
  private readonly WAIT_TIME = 10;
  private socketClient: SocketClient | null = null;

  open(socketClient: SocketClient, dispatch: AppDispatch) {
    this.socketClient = socketClient;

    const openHandler = () => {
      dispatch(connectSuccess());
      dispatch(changeMarket({ selectedMarket: Market.NONE }));
    };

    const onCloseHandler = (event: CloseEvent): void =>
      this.closeHandler(event, dispatch);

    const onMessageHandler = (messageEvent: MessageEvent) => {
      const data: SocketEventData = JSON.parse(messageEvent.data);
      this.messageHandler(data, dispatch);
    };

    socketClient.onOpen(openHandler);
    socketClient.onClose(onCloseHandler);
    socketClient.onMessage(onMessageHandler);
  }

  subscribeToMarket(marketForSubscription: Market): void {
    const sendSubscribeData = this.createMessage(
      SocketEvent.subscribe,
      this.FEED,
      marketForSubscription
    );
    this.waitForSocket(sendSubscribeData);
  }

  unsuscribeFromMarket(selectedMarket: Market): void {
    const sendUnsubscribeData = this.createMessage(
      SocketEvent.unsubscribe,
      this.FEED,
      selectedMarket
    );
    this.waitForSocket(sendUnsubscribeData);
  }

  closeSocket(): void {
    this.socketClient?.close(this.NORMAL_CLOSURE);
  }

  private waitForSocket(message: string, timeoutCounter: number = 0): void {
    setTimeout(() => {
      if (this.socketClient?.isReady()) {
        this.socketClient.send(message);
      } else {
        if (timeoutCounter < this.TIMEOUT) {
          timeoutCounter += 10;
          this.waitForSocket(message, timeoutCounter);
        } else {
          console.error('Socket connection error');
        }
      }
    }, this.WAIT_TIME);
  }

  private createMessage(
    socketEvent: SocketEvent,
    feed: string,
    market: Market
  ): string {
    return `{"event":"${socketEvent}","feed":"${feed}","product_ids":["${market}"]}`;
  }

  private messageHandler(data: SocketEventData, dispatch: AppDispatch): void {
    const { event, bids, asks, product_ids = [] } = data;

    if (event === SocketEvent.subscribed) {
      const newMarket = product_ids[this.NEW_MARKET];

      dispatch(subscribeSuccess());
      dispatch(changeMarket({ selectedMarket: newMarket }));
    } else if (event === SocketEvent.unsubscribed) {
      dispatch(unsubscribeSuccess());
    }

    if (bids?.length > 0) {
      let filtBids: [number, number][] = bids.filter(
        (el: [number, number]) => el[this.SIZE] > 0
      );
      if (filtBids.length > 0) {
        dispatch(processSocketData({ bids: filtBids }));
      }
    }

    if (asks?.length > 0) {
      let filtAsks: number[][] = asks.filter(
        (el: number[]) => el[this.SIZE] > 0
      );
      if (filtAsks.length > 0) {
        dispatch(processSocketData({ asks: filtAsks }));
      }
    }
  }

  private closeHandler(event: CloseEvent, dispatch: AppDispatch): void {
    if (event.code === this.NORMAL_CLOSURE) {
      dispatch(disconnectSuccess());
    } else {
      console.error(`WebSocket Client Error Code: ${event.code}`);
      dispatch(connectError());
    }
  }
}

const orderbookSocket = new OrderbookSocket();

export default orderbookSocket;
