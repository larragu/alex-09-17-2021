import { Middleware } from '@reduxjs/toolkit';
import { OrderbookSocket } from '../OrderbookSocket';
import { SocketActions } from '../types';
import { socketActions } from './socket-slice';

const socketMiddleware: Middleware = (store) => {
  let orderbookSocket: OrderbookSocket | null;

  return (next) => (action: SocketActions) => {
    if (socketActions.connectToSocket.match(action)) {
      if (!orderbookSocket) {
        orderbookSocket = new OrderbookSocket(store.dispatch);
      }
    } else if (socketActions.disconnectFromSocket.match(action)) {
      orderbookSocket?.closeSocket();
      orderbookSocket = null;
    } else if (socketActions.subscribeToMarket.match(action)) {
      orderbookSocket?.subscribeToMarket(action.payload);
    } else if (socketActions.unsubscribeFromMarket.match(action)) {
      orderbookSocket?.unsuscribeFromMarket(action.payload);
    }

    next(action);
  };
};

export default socketMiddleware;
