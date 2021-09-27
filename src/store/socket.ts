import { createSlice } from "@reduxjs/toolkit";
import { Markets, SocketPayload, SocketState } from "../models";
const initialSocketState:SocketState = { isConnected: false, isSubscribed: false, selectedMarket: Markets.XBT_USD};

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
      state.isConnected = false;
    },
    subscribe(state:SocketState, action:SocketPayload) {
    },
    subscribeSuccess(state:SocketState, action:SocketPayload) {
      state.isSubscribed = true;
      state.selectedMarket = action.payload.selectedMarket!;
    },
    unsubscribe() {
    },
    unsubscribeSuccess(state:SocketState) {
      state.isSubscribed = false;
    }
  }
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;