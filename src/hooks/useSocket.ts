import { useState, useEffect, useCallback } from 'react';

import { Market, ReducersState } from '../types';
import { socketActions } from '../store/socket-slice';
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
      dispatch(socketActions.connectToSocket());
    },
    [dispatch]
  );

  useEffect(() => {
    if (newSubscription && isConnected) {
      if (selectedMarket !== newMarket) {
        if (!isSubscribed) {
          dispatch(socketActions.subscribeToMarket(newMarket));
          setNewMarket(Market.NONE);
          setNewSubscription(false);
        } else if (isSubscribed) {
          dispatch(socketActions.unsubscribeFromMarket(selectedMarket));
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

  const connectSocket = useCallback(
    (newMarket: Market) => {
      makeConnection(newMarket);
    },
    [makeConnection]
  );

  const changeMarket = useCallback((selectedMarket: Market) => {
    setNewMarket(selectedMarket);
    setNewSubscription(true);
  }, []);

  const disconnectSocket = useCallback(() => {
    if (isConnected) {
      dispatch(socketActions.disconnectFromSocket());
    }
  }, [dispatch, isConnected]);

  return {
    isSocketConnected: isConnected,
    disconnectSocket,
    connectSocket,
    selectedMarket,
    changeMarket,
    connectionError,
    isSubscribed,
  };
};

export default useSocket;
