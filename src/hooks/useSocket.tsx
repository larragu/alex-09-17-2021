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

  const makeConnection = (selectedMarket:Markets) => {
    setNewSubscription(true);
    setNewMarket(selectedMarket)
    store.dispatch(socketActions.connect());
  };

  useEffect(() => {
    makeConnection(Markets.XBT_USD);
  }, []);

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

  const connectHandler = () => {
    makeConnection(selectedMarket);
  }

  const changeMarketHandler = useCallback(() => {
    if(selectedMarket === Markets.XBT_USD) {
      setNewMarket(Markets.ETH_USD);
    } else {
      setNewMarket(Markets.XBT_USD);
    }
    setNewSubscription(true)
  },[selectedMarket]);

  const disconnectHandler = useCallback(() => {
    if(isConnected) {
      store.dispatch(socketActions.disconnect());
    }
  },[isConnected]);

  return {
    isConnected,
    disconnect: disconnectHandler,
    connect:connectHandler,
    changeMarket:changeMarketHandler
  }
}

export default useSocket;