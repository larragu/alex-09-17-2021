import { Middleware } from '@reduxjs/toolkit';
import orderbookSocket from './OrderbookSocket';
import { SocketAction } from '../../types';
import { WEB_SOCKET_URL } from '../../constants';
import WebSocketClient from './WebSocketClient';
import {
  connectToSocket,
  disconnectFromSocket,
  subscribeToMarket,
  unsubscribeFromMarket,
} from '../socket-slice';

const socketMiddleware: Middleware = (store) => {
  return (next) => (action: SocketAction) => {
    if (connectToSocket.match(action)) {
      const webSocketClient = new WebSocketClient(WEB_SOCKET_URL);
      orderbookSocket.open(webSocketClient, store.dispatch);
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
