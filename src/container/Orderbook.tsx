import React, { useCallback, useEffect } from "react";
import { useSelector } from 'react-redux';

import styles from './Orderbook.module.css';
import { Markets, ReducersState, VisibilityState } from "../models";
import Orders from "../components/Orders/Orders";
import Notification from "../components/Notification/Notification";
import store from "../store";
import { socketActions } from "../store/socket";
import Header from "../components/Header/Header";
import useMediaQuery from "../hooks/useMediaQuery";
import Footer from "../components/Footer/Footer";

let isLoaded = false;
const Orderbook = () => {
  const isConnected = useSelector((state:ReducersState) => state.socket.isConnected);
  const selectedMarket = useSelector((state:ReducersState) => state.socket.selectedMarket);
  
  let isMobile = useMediaQuery('(max-width: 600px)')
  const VISIBILITY_CHANGE = "visibilitychange";


  useEffect(() => {
    store.dispatch(socketActions.connect());
    store.dispatch(socketActions.subscribe({selectedMarket: Markets.XBT_USD}));
    isLoaded = true;
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
      {isLoaded && !isConnected && <Notification selectedMarket={selectedMarket} /> }
      <div className={styles['orders']}>
        <Header isMobile={isMobile}/>
        <Orders/>
        <Footer selectedMarket={selectedMarket} isConnected={isConnected!} />
      </div>
    </div>
  );
};

export default Orderbook;


