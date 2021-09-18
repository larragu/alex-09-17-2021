import { Markets, SocketAction, SocketActions, SocketEvent, SocketEventData } from '../models';
import { asksActions } from '../store/asks';
import { bidsActions } from '../store/bids';
import { socketActions } from '../store/socket';


const webSocket = (store:any) => {
  const WEB_SOCKET_URL = "wss://www.cryptofacilities.com/ws/v1";
  let socket:WebSocket;
  const NORMAL_CLOSURE = 1000;
  const FEED = "book_ui_1";
  const SIZE = 1;
  const TIMEOUT = 5000;
  let timeoutCounter = 0;
  
  const waitForSocket = (message:any) => {
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

    socket.onclose = (event:CloseEvent) => {
      if(event.code !== NORMAL_CLOSURE) {
        console.error('WebSocket Client Error Code: ', event.code);
      }

      store.dispatch(socketActions.disconnect())
    };

    socket.onmessage = (messageEvent:MessageEvent) => {
      const data:SocketEventData = JSON.parse(messageEvent.data);  

      if(data.event === SocketEvent.subscribed) {
        const NEW_MARKET = 0;
        const newMarket = data.product_ids[NEW_MARKET];
        store.dispatch(bidsActions.clearData());
        store.dispatch(asksActions.clearData());
        store.dispatch(socketActions.changeMarket({selectedMarket:newMarket}))
      }

      if(data.bids?.length > 0) {
        let filtBids:number[][] = data.bids.filter((el:number[]) => el[SIZE] > 0);
        if (filtBids.length > 0) { 
          store.dispatch(bidsActions.processSocketData(filtBids));
        }
      }

      if(data.asks?.length > 0) {
        let filtAsks:number[][] = data.asks.filter((el:number[]) => el[SIZE] > 0);
        if (filtAsks.length > 0) { 
          store.dispatch(asksActions.processSocketData(filtAsks));
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

  return (next:any) => (action:SocketAction) => {
      switch(action.type) {
        case SocketActions.CONNECT:
          socket = initializeSocket(socket);
          break;
        case SocketActions.DISCONNECT:
          socket.close(NORMAL_CLOSURE);
          break;
        case SocketActions.SUBSCRIBE:
          susbscribeToMarket(action.payload.selectedMarket);
          break;
        case SocketActions.UNSUSCRIBE:
          unsuscribeFromMarket(action.payload.selectedMarket);
          break;
      }
    return next(action);
  }
  
};

export default webSocket;


