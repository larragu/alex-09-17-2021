import { configureStore } from '@reduxjs/toolkit';

import feedSlice from './feed-slice';
import socketSlice from './socket-slice';
import socketMiddleware from './middleware/socketMiddleware';

const store = configureStore({
  reducer: { feed: feedSlice, socket: socketSlice },
  middleware: [socketMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
