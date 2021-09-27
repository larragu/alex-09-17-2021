import { Dispatch } from 'react';
import { Action, MiddlewareAPI } from 'redux';
import { Markets, SocketAction, SocketActions, SocketEvent, SocketEventData } from '../models';
import { feedActions } from '../store/feed';
import { socketActions } from '../store/socket';

const webSocket = (store:MiddlewareAPI) => {
  const WEB_SOCKET_URL = "wss://www.cryptofacilities.com/ws/v1";
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
  
  const createMessage = (socketEvent:SocketEvent, feed:string, market: Markets) => {
    return `{"event":"${socketEvent}","feed":"${feed}","product_ids":["${market}"]}`;
  }

  const initializeSocket = (socket:WebSocket) => {
    socket = new WebSocket(WEB_SOCKET_URL);

    socket.onopen = function() {
      store.dispatch(socketActions.connectSuccess());
    };

    socket.onclose = (event:CloseEvent) => {
      if(event.code !== NORMAL_CLOSURE) {
        console.error('WebSocket Client Error Code: ', event.code);
      }

      store.dispatch(socketActions.disconnectSuccess())
    };

    socket.onmessage = (messageEvent:MessageEvent) => {
      const data:SocketEventData = JSON.parse(messageEvent.data);  

      if(data.event === SocketEvent.subscribed) {
        const NEW_MARKET = 0;
        const newMarket = data.product_ids[NEW_MARKET];
        store.dispatch(feedActions.clearData());
        store.dispatch(socketActions.subscribeSuccess({selectedMarket:newMarket}))
      } else if (data.event === SocketEvent.unsubscribed) {
        store.dispatch(socketActions.unsubscribeSuccess())
      }

      if(data.bids?.length > 0) {
        let filtBids:number[][] = data.bids.filter((el:number[]) => el[SIZE] > 0);
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
    };
    return socket;
  }

  const susbscribeToMarket = (marketForSubscription:Markets) => {
    const marketForUnsubscription = marketForSubscription === Markets.ETH_USD ? Markets.XBT_USD : Markets.ETH_USD;
    const sendSubscribeData = createMessage(SocketEvent.subscribe, FEED,marketForSubscription);

    unsuscribeFromMarket(marketForUnsubscription)
    waitForSocket(sendSubscribeData);
  }

  const unsuscribeFromMarket = (selectedMarket:Markets) => {
    const sendUnsubscribeData = createMessage(SocketEvent.unsubscribe, FEED,selectedMarket);
    waitForSocket(sendUnsubscribeData);
  }

  return (next:Dispatch<Action>) => (action:SocketAction) => {
      switch(action.type) {
        case SocketActions.CONNECT:
          socket = initializeSocket(socket);
          return;
        case SocketActions.DISCONNECT:
          socket.close(NORMAL_CLOSURE);
          return;
        case SocketActions.SUBSCRIBE:
          susbscribeToMarket(action.payload.selectedMarket);
          return;
        case SocketActions.UNSUSCRIBE:
          unsuscribeFromMarket(action.payload.selectedMarket);
          return;
        default:
          break;
      }
    return next(action);
  }
  
};

export default webSocket;


