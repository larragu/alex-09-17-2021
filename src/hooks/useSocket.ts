import { useState, useEffect, useCallback } from 'react';

import { Market, ReducersState } from '../types';
import {
  connectToSocket,
  unsuscribeFromMarket,
  subscribeToMarket,
  closeSocket,
} from '../store/socket-actions';
import { useAppDispatch, useAppSelector } from '.';

const useSocket = () => {
  const dispatch = useAppDispatch();

  const { isConnected, isSubscribed, connectionError } = useAppSelector(
    (state) => state.socket
  );
  const selectedMarket = useAppSelector(
    (state: ReducersState) => state.feed.selectedMarket
  );

  const [newMarket, setNewMarket] = useState(Market.NONE);
  const [newSubscription, setNewSubscription] = useState(false);

  const makeConnection = useCallback(
    (newMarket: Market) => {
      setNewSubscription(true);
      setNewMarket(newMarket);
      dispatch(connectToSocket());
    },
    [dispatch]
  );

  useEffect(() => {
    if (newSubscription && isConnected) {
      if (selectedMarket !== newMarket) {
        if (!isSubscribed) {
          dispatch(subscribeToMarket(newMarket));
          setNewMarket(Market.NONE);
          setNewSubscription(false);
        } else if (isSubscribed) {
          dispatch(unsuscribeFromMarket(selectedMarket));
        }
      }
    }
  }, [
    isConnected,
    isSubscribed,
    newSubscription,
    selectedMarket,
    newMarket,
    dispatch,
  ]);

  const connect = useCallback(
    (newMarket: Market) => {
      makeConnection(newMarket);
    },
    [makeConnection]
  );

  const changeMarket = useCallback((selectedMarket: Market) => {
    setNewMarket(selectedMarket);
    setNewSubscription(true);
  }, []);

  const disconnect = useCallback(() => {
    if (isConnected) {
      dispatch(closeSocket());
    }
  }, [dispatch, isConnected]);

  return {
    isSocketConnected: isConnected,
    disconnectSocket: disconnect,
    connectSocket: connect,
    selectedMarket,
    changeMarket,
    connectionError,
    isSubscribed,
  };
};

export default useSocket;
