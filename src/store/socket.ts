import { createSlice } from "@reduxjs/toolkit";
import { FeedPayload, SocketState } from "../models";
const initialSocketState:SocketState = { isConnected: false, isSubscribed: false };

const socketSlice = createSlice({
  name: 'socket',
  initialState: initialSocketState,
  reducers: {
    connect() {
    },  
    connectSuccess(state:SocketState) {
      state.isConnected = true;
    },    
    disconnect() {
    },    
    disconnectSuccess(state:SocketState) {
      state.isSubscribed = false;
      state.isConnected = false;
    },
    subscribe(state:SocketState, action:FeedPayload) {
    },
    subscribeSuccess(state:SocketState) {
      state.isSubscribed = true;
    },
    unsubscribe(state:SocketState, action:FeedPayload) {
    },
    unsubscribeSuccess(state:SocketState) {
      state.isSubscribed = false;
    }
  }
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;