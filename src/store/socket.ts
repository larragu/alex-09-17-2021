import { createSlice } from "@reduxjs/toolkit";
import { Markets, SocketPayload, SocketState } from "../models";
const initialSocketState:SocketState = { isConnected: false, isSubscribed: false, selectedMarket: Markets.XBT_USD};

const socketSlice = createSlice({
  name: 'socket',
  initialState: initialSocketState,
  reducers: {
    connect(state:SocketState) {
      state.isConnected = true;
    },    
    disconnect(state:SocketState) {
      state.isConnected = false;
    },
    subscribe(state:SocketState, action:SocketPayload) {
      state.isSubscribed = true;
    },
    unsubscribe(state:SocketState) {
      state.isSubscribed = false;
    },
    changeMarket(state:SocketState, action:SocketPayload) {
      state.selectedMarket = action.payload.selectedMarket!;
    }
  }
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;