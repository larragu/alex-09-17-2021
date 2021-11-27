import { Dispatch } from 'react';
import { Action, MiddlewareAPI } from 'redux';

import { Market, WebSocketAction, SocketAction, SocketEvent, SocketEventData } from '../types';
import { feedActions } from '../store/feed';
import { socketActions } from '../store/socket';

const webSocket = (store:MiddlewareAPI) => {
  const WEB_SOCKET_URL = "wss://www.cryptofacilities.com/ws/v1";
  const NEW_MARKET = 0;
  let socket:WebSocket;
  const NORMAL_CLOSURE = 1000;
  const FEED = "book_ui_1";
  const SIZE = 1;
  const TIMEOUT = 5000;
  let timeoutCounter = 0;
  
  const waitForSocket = (message:string) => {
    setTimeout(() => {
      if (socket && socket.readyState === 1) {
        socket.send(message)
       } else {
         if(timeoutCounter < TIMEOUT) {
          timeoutCounter += 10;
          waitForSocket(message);
        } else {
          console.error('Socket connection error');
        }
       }
    }, 10);
  }
  
  const createMessage = (socketEvent:SocketEvent, feed:string, market: Market) => {
    return `{"event":"${socketEvent}","feed":"${feed}","product_ids":["${market}"]}`;
  }

  const messageHandler = (messageEvent:MessageEvent) => {
    const data:SocketEventData = JSON.parse(messageEvent.data);  

    if(data.event === SocketEvent.subscribed) {
      const newMarket = data.product_ids![NEW_MARKET];
      
      store.dispatch(socketActions.subscribeSuccess())
      store.dispatch(feedActions.changeMarket({selectedMarket:newMarket}));
    } else if (data.event === SocketEvent.unsubscribed) {
      store.dispatch(socketActions.unsubscribeSuccess())
    }

    if(data.bids?.length > 0) {
      let filtBids:[number,number][] = data.bids.filter((el:[number, number]) => el[SIZE] > 0);
      if (filtBids.length > 0) { 
        store.dispatch(feedActions.processSocketData({bids:filtBids}));
      }
    }

    if(data.asks?.length > 0) {
      let filtAsks:number[][] = data.asks.filter((el:number[]) => el[SIZE] > 0);
      if (filtAsks.length > 0) { 
        store.dispatch(feedActions.processSocketData({asks:filtAsks}));
      }
    }
  }

  const closeHandler = (event:CloseEvent) => {
    if(event.code !== NORMAL_CLOSURE) {
      console.error('WebSocket Client Error Code: ', event.code);
      store.dispatch(socketActions.unsubscribeSuccess());
    }
    store.dispatch(socketActions.disconnectSuccess());
  }

  const initializeSocket = (socket:WebSocket) => {
    socket = new WebSocket(WEB_SOCKET_URL);

    socket.onopen = () => {
      store.dispatch(socketActions.connectSuccess());
      store.dispatch(feedActions.changeMarket({selectedMarket:Market.NONE}));
    };

    socket.onclose = (event:CloseEvent) => {
      closeHandler(event);
    };

    socket.onmessage = (messageEvent:MessageEvent) => {
      messageHandler(messageEvent);
    };
    return socket;
  }

  const susbscribeToMarket = (marketForSubscription:Market) => {
    const sendSubscribeData = createMessage(SocketEvent.subscribe, FEED,marketForSubscription);
    waitForSocket(sendSubscribeData);
  }

  const unsuscribeFromMarket = (selectedMarket:Market) => {
    const sendUnsubscribeData = createMessage(SocketEvent.unsubscribe, FEED,selectedMarket);
    waitForSocket(sendUnsubscribeData);
  }

  return (next:Dispatch<Action>) => (action:WebSocketAction) => {
      switch(action.type) {
        case SocketAction.CONNECT:
          socket = initializeSocket(socket);
          return;
        case SocketAction.DISCONNECT:
          socket.close(NORMAL_CLOSURE);
          return;
        case SocketAction.SUBSCRIBE:
          susbscribeToMarket(action.payload.selectedMarket!);
          return;
        case SocketAction.UNSUSCRIBE:
          unsuscribeFromMarket(action.payload.selectedMarket!);
          return;
        default:
          break;
      }
    return next(action);
  }
};

export default webSocket;


