import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { ReducersState, Markets } from "../models";
import store from "../store";
import { socketActions } from "../store/socket";

const useSocket = () => {
  const { 
    isConnected, 
    isSubscribed
  } = useSelector((state:ReducersState) => state.socket);

  const selectedMarket = useSelector((state:ReducersState) => state.feed.selectedMarket);
  const [newMarket, setNewMarket] = useState(Markets.NONE);
  const [newSubscription, setNewSubscription] = useState(false);

  const makeConnection = useCallback((newMarket:Markets) => {
    setNewSubscription(true);
    setNewMarket(newMarket)
    store.dispatch(socketActions.connect());
  },[]);

  useEffect(() => {
    if(newSubscription && isConnected) {
      if(selectedMarket !== newMarket) {
        if(!isSubscribed) {
          store.dispatch(socketActions.subscribe({selectedMarket: newMarket}));    
          setNewMarket(Markets.NONE);  
          setNewSubscription(false);
        }else if(isSubscribed) {
          store.dispatch(socketActions.unsubscribe({selectedMarket: selectedMarket}));
        }
      }
    }
  }, [isConnected, isSubscribed, newSubscription, selectedMarket, newMarket]);

  const connect = useCallback((newMarket:Markets) => {
    makeConnection(newMarket);
  },[makeConnection])

  const changeMarket = useCallback((selectedMarket:Markets) => {
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