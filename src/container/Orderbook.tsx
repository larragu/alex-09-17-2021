import React, { useCallback, useEffect } from "react";
import { useSelector } from 'react-redux';

import styles from './Orderbook.module.css';
import { Markets, ReducersState, VisibilityState } from "../models";
import Orders from "../components/Orders/Orders";
import Notification from "../components/Notification/Notification";
import store from "../store";
import { socketActions } from "../store/socket";
import Title from "../components/Orders/OrderTable/Title/Title";
import useMediaQuery from "../hooks/useMediaQuery";

const Orderbook = () => {
  const isConnected = useSelector((state:ReducersState) => state.socket.isConnected);
  const selectedMarket = useSelector((state:ReducersState) => state.socket.selectedMarket);
  
  let isMobile = useMediaQuery('(max-width: 600px)')
  const VISIBILITY_CHANGE = "visibilitychange";


  useEffect(() => {
    store.dispatch(socketActions.connect());
    store.dispatch(socketActions.subscribe({selectedMarket: Markets.XBT_USD}));
  }, [])

  const toggleConnectionHandler = useCallback(() => {
    if(document.visibilityState === VisibilityState.HIDDEN) {
     if(selectedMarket) {
      store.dispatch(socketActions.disconnect());
     }
    }
  },[selectedMarket])

  useEffect(()=> {
    window.addEventListener(VISIBILITY_CHANGE, toggleConnectionHandler)
    return () => window.removeEventListener(VISIBILITY_CHANGE, toggleConnectionHandler);
  },[toggleConnectionHandler]);

  return (
    <div className={styles['orderbook']}>
      {!isConnected && <Notification selectedMarket={selectedMarket} /> }
      <div className={styles['orders']}>
        <Title isMobile={isMobile}/>
        <Orders selectedMarket={selectedMarket}/>
      </div>
    </div>
  );
};

export default Orderbook;


