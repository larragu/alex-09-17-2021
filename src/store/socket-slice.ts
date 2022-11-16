import { createSlice } from '@reduxjs/toolkit';

import { SocketState } from '../types';

export const initialSocketState: SocketState = {
  isConnected: false,
  isSubscribed: false,
  sendingMessage: false,
  connectionError: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState: initialSocketState,
  reducers: {
    sendMessage(state: SocketState) {
      state.connectionError = false;
      state.sendingMessage = true;
    },
    connectSuccess(state: SocketState) {
      state.sendingMessage = false;
      state.isConnected = true;
    },
    disconnectSuccess(state: SocketState) {
      state.sendingMessage = false;
      state.isSubscribed = false;
      state.isConnected = false;
    },
    subscribeSuccess(state: SocketState) {
      state.sendingMessage = false;
      state.isSubscribed = true;
    },
    unsubscribeSuccess(state: SocketState) {
      state.sendingMessage = false;
      state.isSubscribed = false;
    },
    connectError(state: SocketState) {
      state.sendingMessage = false;
      state.isSubscribed = false;
      state.isConnected = false;
      state.connectionError = true;
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
