import { createSlice } from '@reduxjs/toolkit';

import { SocketState } from '../types';

export const initialSocketState: SocketState = {
  isConnected: false,
  isSubscribed: false,
  isConnecting: false,
  connectionError: false,
  subscribing: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState: initialSocketState,
  reducers: {
    connectToSocket(state: SocketState) {
      state.isConnecting = true;
    },
    disconnectFromSocket(state: SocketState) {
      state.isConnecting = false;
    },
    connectSuccess(state: SocketState) {
      state.connectionError = false;
      state.isConnecting = false;
      state.isConnected = true;
    },
    disconnectSuccess(state: SocketState) {
      state.isConnecting = false;
      state.isSubscribed = false;
      state.isConnected = false;
    },
    subscribeToMarket(state: SocketState, _action) {
      state.subscribing = true;
    },
    unsubscribeFromMarket(state: SocketState, _action) {
      state.subscribing = false;
    },
    subscribeSuccess(state: SocketState) {
      state.subscribing = false;
      state.isSubscribed = true;
    },
    unsubscribeSuccess(state: SocketState) {
      state.subscribing = false;
      state.isSubscribed = false;
    },
    connectError(state: SocketState) {
      state.isConnecting = false;
      state.isSubscribed = false;
      state.isConnected = false;
      state.connectionError = true;
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
