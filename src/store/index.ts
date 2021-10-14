import {  configureStore, Store } from '@reduxjs/toolkit';

import feedReducer from './feed';
import socketReducer from './socket';
import webSocket from '../middleware/socket';

const store:Store = configureStore({
  reducer: { feed: feedReducer, socket: socketReducer },
  middleware: [webSocket]
});

export default store;