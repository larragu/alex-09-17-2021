import {  configureStore, Store } from '@reduxjs/toolkit';
import bidsReducer from './bids';
import asksReducer from './asks';
import socketReducer from './socket';
import webSocket from '../middleware/socket';

const store:Store = configureStore({
  reducer: { bids: bidsReducer, asks: asksReducer, socket: socketReducer },
  middleware: [webSocket]
});

export default store;