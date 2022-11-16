import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { initialFeedState } from '../src/mocks';
import { initialSocketState } from '../src/store/socket-slice';
import { SocketState, FeedState } from '../src/types';

interface MockstoreProps {
  socketState?: SocketState;
  feedState?: FeedState;
  children: ReactNode;
}

const Mockstore = ({ socketState, feedState, children }: MockstoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        socket: createSlice({
          name: 'socket',
          initialState: socketState || initialSocketState,
          reducers: {},
        }).reducer,
        feed: createSlice({
          name: 'feed',
          initialState: feedState || initialFeedState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default Mockstore;
