import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { ReducersState, Market } from "../types";
import store from "../store";
import { socketActions } from "../store/socket";

const useSocket = () => {
  const { 
    isConnected, 
    isSubscribed
  } = useSelector((state:ReducersState) => state.socket);

  const selectedMarket = useSelector((state:ReducersState) => state.feed.selectedMarket);
  const [newMarket, setNewMarket] = useState(Market.NONE);
  const [newSubscription, setNewSubscription] = useState(false);

  const makeConnection = useCallback((newMarket:Market) => {
    setNewSubscription(true);
    setNewMarket(newMarket)
    store.dispatch(socketActions.connect());
  },[]);

  useEffect(() => {
    if(newSubscription && isConnected) {
      if(selectedMarket !== newMarket) {
        if(!isSubscribed) {
          store.dispatch(socketActions.subscribe({selectedMarket: newMarket}));    
          setNewMarket(Market.NONE);  
          setNewSubscription(false);
        }else if(isSubscribed) {
          store.dispatch(socketActions.unsubscribe({selectedMarket: selectedMarket}));
        }
      }
    }
  }, [isConnected, isSubscribed, newSubscription, selectedMarket, newMarket]);

  const connect = useCallback((newMarket:Market) => {
    makeConnection(newMarket);
  },[makeConnection])

  const changeMarket = useCallback((selectedMarket:Market) => {
    setNewMarket(selectedMarket);
    setNewSubscription(true)
  },[]);

  const disconnect = useCallback(() => {
    if(isConnected) {
      store.dispatch(socketActions.disconnect());
    }
  },[isConnected]);

  return {
    isConnected,
    disconnect,
    connect,
    selectedMarket,
    changeMarket
  }
}

export default useSocket;