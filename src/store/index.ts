import { configureStore, Store } from '@reduxjs/toolkit';

import feedSlice from './feed-slice';
import socketSlice from './socket-slice';

const store: Store = configureStore({
  reducer: { feed: feedSlice, socket: socketSlice },
});

export default store;
