import React, { useCallback, useEffect } from "react";
import { useSelector } from 'react-redux';

import styles from './Orderbook.module.css';
import { Markets, ReducersState, VisibilityState } from "../models";
import Orders from "../components/Orders/Orders";
import Notification from "../components/Notification/Notification";
import store from "../store";
import { socketActions } from "../store/socket";
import Spread from "../components/Spread/Spread";
import useMediaQuery from "../hooks/useMediaQuery";

const Orderbook = () => {
  let isMobile = useMediaQuery('(max-width: 600px)');
  const isConnected = useSelector((state:ReducersState) => state.socket.isConnected);
  const selectedMarket = useSelector((state:ReducersState) => state.socket.selectedMarket);
  
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

  const Title = () => {
    return (
    <div className={styles['title']}>
      <div className={styles['left']}>
        Order Book
      </div>
      {!isMobile && <Spread />}
    </div>
    )

  }

  return (
    <div className={styles['orderbook']}>
      {!isConnected && <Notification selectedMarket={selectedMarket} /> }
      <Title/>
      <div className={styles['orders']}>
        <Orders selectedMarket={selectedMarket}/>
      </div>
    </div>
  );
};

export default Orderbook;


