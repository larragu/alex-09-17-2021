import { Middleware } from '@reduxjs/toolkit';
import { WEB_SOCKET_URL } from '../constants';
import OrderbookSocket from '../OrderbookSocket';
import { SocketAction } from '../types';
import {
  connectToSocket,
  disconnectFromSocket,
  subscribeToMarket,
  unsubscribeFromMarket,
} from './socket-slice';

const socketMiddleware: Middleware = (store) => {
  let orderbookSocket: OrderbookSocket;

  return (next) => (action: SocketAction) => {
    if (connectToSocket.match(action)) {
      orderbookSocket = new OrderbookSocket(
        new WebSocket(WEB_SOCKET_URL),
        store.dispatch
      );
    } else if (disconnectFromSocket.match(action)) {
      orderbookSocket.closeSocket();
    } else if (subscribeToMarket.match(action)) {
      orderbookSocket.subscribeToMarket(action.payload);
    } else if (unsubscribeFromMarket.match(action)) {
      orderbookSocket.unsuscribeFromMarket(action.payload);
    }

    next(action);
  };
};

export default socketMiddleware;
