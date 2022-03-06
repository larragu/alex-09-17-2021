import { Dispatch } from "@reduxjs/toolkit";
import { Market, SocketEvent, SocketEventData } from './types';
import { feedActions } from './store/feed-slice';
import { subscribeSuccess, unsubscribeSuccess, connectSuccess, disconnectSuccess, connectError } from './store/socket-actions';

export class OrderbookSocket {
  private readonly WEB_SOCKET_URL = "wss://www.cryptofacilities.com/ws/v1";
  private readonly NEW_MARKET = 0;
  private readonly NORMAL_CLOSURE = 1000;
  private readonly FEED = "book_ui_1";
  private readonly SIZE = 1;
  private readonly TIMEOUT = 5000;
  private readonly WAIT_TIME = 10;
  private timeoutCounter = 0;
  private socket: WebSocket;

  constructor (private readonly dispatch: Dispatch<any>) {
    this.socket = new WebSocket(this.WEB_SOCKET_URL);

    this.socket.onopen = () => {
      this.dispatch(connectSuccess());
      this.dispatch(feedActions.changeMarket({selectedMarket:Market.NONE}));
    };

    this.socket.onclose = (event:CloseEvent) => this.closeHandler(event, this.dispatch);

    this.socket.onmessage = (messageEvent:MessageEvent) => this.messageHandler(messageEvent, this.dispatch);
  }

  subscribeToMarket(marketForSubscription:Market) {
    const sendSubscribeData = this.createMessage(SocketEvent.subscribe, this.FEED,marketForSubscription);
    this.waitForSocket(sendSubscribeData);
  }

  unsuscribeFromMarket(selectedMarket:Market) {
    const sendUnsubscribeData = this.createMessage(SocketEvent.unsubscribe, this.FEED,selectedMarket);
    this.waitForSocket(sendUnsubscribeData);
  }

  closeSocket() { this.socket!.close(this.NORMAL_CLOSURE); }

  private waitForSocket(message:string) {
    setTimeout(() => {
      if (this.socket && this.socket.readyState === 1) {
        this.socket.send(message)
       } else {
         if(this.timeoutCounter < this.TIMEOUT) {
          this.timeoutCounter += 10;
          this.waitForSocket(message);
        } else {
          console.error('Socket connection error');
        }
       }
    }, this.WAIT_TIME);
  }
  
  private createMessage(socketEvent:SocketEvent, feed:string, market: Market) {
    return `{"event":"${socketEvent}","feed":"${feed}","product_ids":["${market}"]}`;
  }

  private messageHandler(messageEvent:MessageEvent,dispatch:Dispatch<any>) {
    const data:SocketEventData = JSON.parse(messageEvent.data);  

    if(data.event === SocketEvent.subscribed) {
      const newMarket = data.product_ids![this.NEW_MARKET];
      
      dispatch(subscribeSuccess())
      dispatch(feedActions.changeMarket({selectedMarket:newMarket}));
    } else if (data.event === SocketEvent.unsubscribed) {
      dispatch(unsubscribeSuccess())
    }

    if(data.bids?.length > 0) {
      let filtBids:[number,number][] = data.bids.filter((el:[number, number]) => el[this.SIZE] > 0);
      if (filtBids.length > 0) { 
        dispatch(feedActions.processSocketData({bids:filtBids}));
      }
    }

    if(data.asks?.length > 0) {
      let filtAsks:number[][] = data.asks.filter((el:number[]) => el[this.SIZE] > 0);
      if (filtAsks.length > 0) { 
        dispatch(feedActions.processSocketData({asks:filtAsks}));
      }
    }
  }

  private closeHandler(event:CloseEvent, dispatch:Dispatch<any>) {
    if(event.code === this.NORMAL_CLOSURE) {
      dispatch(disconnectSuccess());
    } else {
      console.error(`WebSocket Client Error Code: ${event.code}`);
      dispatch(connectError());
    }
  }
};

