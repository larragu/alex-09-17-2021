import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import {socketActions} from './socket-slice'
import {orderbookSocket} from '../OrderbookSocket';
import { Market } from '../types';

export const connectToSocket = () => {
  return (dispatch:Dispatch<AnyAction>) => {
    dispatch(socketActions.sendMessage());
    orderbookSocket.initializeSocket(dispatch);
  }
}

export const closeSocket = () => {
  return (dispatch:Dispatch<AnyAction>) => {
    dispatch(socketActions.sendMessage());
    orderbookSocket.closeSocket();
  }
}

export const subscribeToMarket = (selectedMarket:Market) => {
  return (dispatch:Dispatch<AnyAction>) => {
    dispatch(socketActions.sendMessage());
    orderbookSocket.subscribeToMarket(selectedMarket);
  }
}

export const unsuscribeFromMarket = (selectedMarket:Market) => {
  return (dispatch:Dispatch<AnyAction>) => {
    dispatch(socketActions.sendMessage());
    orderbookSocket.unsuscribeFromMarket(selectedMarket);
  }
}

export const subscribeSuccess = () => {
  return (dispatch:Dispatch<AnyAction>) => {
    dispatch(socketActions.subscribeSuccess())
  }
}

export const unsubscribeSuccess = () => {
  return (dispatch:Dispatch<AnyAction>) => {
    dispatch(socketActions.unsubscribeSuccess());
  }
}

export const connectSuccess = () => {
  return (dispatch:Dispatch<AnyAction>) => {
    dispatch(socketActions.connectSuccess());
  }
}

export const disconnectSuccess = () => {
  return (dispatch:Dispatch<AnyAction>) => {
    dispatch(socketActions.disconnectSuccess());
  }
} 

export const connectError = () => {
  return (dispatch:Dispatch<AnyAction>) => {
    dispatch(socketActions.connectError());
  }
} 