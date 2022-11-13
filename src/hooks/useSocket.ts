import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReducersState, Market } from '../types';
import {
  connectToSocket,
  unsuscribeFromMarket,
  subscribeToMarket,
  closeSocket,
} from '../store/socket-actions';

const useSocket = () => {
  const dispatch = useDispatch();

  const { isConnected, isSubscribed, connectionError } = useSelector(
    (state: ReducersState) => state.socket
  );
  const selectedMarket = useSelector(
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
  };
};

export default useSocket;
