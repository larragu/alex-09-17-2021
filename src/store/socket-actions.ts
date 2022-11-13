import { socketActions } from './socket-slice';
import { OrderbookSocket } from '../OrderbookSocket';
import { Market } from '../types';
import { AppDispatch } from '.';

let orderbookSocket: OrderbookSocket;

export const connectToSocket = () => (dispatch: AppDispatch) => {
  dispatch(socketActions.sendMessage());
  orderbookSocket = new OrderbookSocket(dispatch);
};

export const closeSocket = () => (dispatch: AppDispatch) => {
  dispatch(socketActions.sendMessage());
  orderbookSocket.closeSocket();
};

export const subscribeToMarket =
  (selectedMarket: Market) => (dispatch: AppDispatch) => {
    dispatch(socketActions.sendMessage());
    orderbookSocket.subscribeToMarket(selectedMarket);
  };

export const unsuscribeFromMarket =
  (selectedMarket: Market) => (dispatch: AppDispatch) => {
    dispatch(socketActions.sendMessage());
    orderbookSocket.unsuscribeFromMarket(selectedMarket);
  };

export const subscribeSuccess = () => (dispatch: AppDispatch) => {
  dispatch(socketActions.subscribeSuccess());
};

export const unsubscribeSuccess = () => (dispatch: AppDispatch) => {
  dispatch(socketActions.unsubscribeSuccess());
};

export const connectSuccess = () => (dispatch: AppDispatch) => {
  dispatch(socketActions.connectSuccess());
};

export const disconnectSuccess = () => (dispatch: AppDispatch) => {
  dispatch(socketActions.disconnectSuccess());
};

export const connectError = () => (dispatch: AppDispatch) => {
  dispatch(socketActions.connectError());
};
