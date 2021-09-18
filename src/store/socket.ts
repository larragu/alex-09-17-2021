import { createSlice } from "@reduxjs/toolkit";
import { Markets, SocketPayload, SocketState } from "../models";
const initialSocketState:any = { isConnected: false, isSubscribed: false, selectedMarket: Markets.XBT_USD};

const socketSlice:any = createSlice({
  name: 'socket',
  initialState: initialSocketState,
  reducers: {
    connect(state:any, action:SocketPayload) {
      state.isConnected = true;
    },    
    disconnect(state:any, action:SocketPayload) {
      state.isConnected = false;
    },
    subscribe(state:any, action:SocketPayload) {
      state.isSubscribed = true;
    },
    unsubscribe(state:any, action:SocketPayload) {
      state.isSubscribed = false;
    },
    changeMarket(state:SocketState, action:SocketPayload) {
      state.selectedMarket = action.payload.selectedMarket;
    }
  }
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;