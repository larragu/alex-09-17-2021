import React, { useCallback, useEffect } from "react";

import styles from './Orderbook.module.css';
import { VisibilityState } from "../models";
import Orders from "../components/Orders/Orders";
import Notification from "../components/Notification/Notification";
import Header from "../components/Header/Header";
import useMediaQuery from "../hooks/useMediaQuery";
import Footer from "../components/Footer/Footer";
import useSocket from '../hooks/useSocket';

let isLoaded = false;
const Orderbook = () => {
  const {
    isConnected,
    disconnect,
    connect,
    changeMarket
  } = useSocket();

  let isMobile = useMediaQuery('(max-width: 40rem)')
  const VISIBILITY_CHANGE = "visibilitychange";

  const reconnectHandler = useCallback(() => {
    connect();
  }, [connect]);

  const toggleHandler = useCallback(() => {
    changeMarket();
  },[changeMarket])

  const toggleConnectionHandler = useCallback(() => {
    if(document.visibilityState === VisibilityState.HIDDEN) {
      disconnect();
    }
  }, [disconnect])

  useEffect(()=> {
    window.addEventListener(VISIBILITY_CHANGE, toggleConnectionHandler)
    return () => window.removeEventListener(VISIBILITY_CHANGE, toggleConnectionHandler);
  },[toggleConnectionHandler]);

  if(isConnected) {
    isLoaded = true;
  }

  return (
    <div className={styles['orderbook']}>
      {isLoaded && !isConnected && <Notification reconnect={reconnectHandler} /> }
      <Header isMobile={isMobile}/>
      <Orders/>
      <Footer toggle={toggleHandler} isConnected={isConnected!} />
    </div>
  );
};

export default Orderbook;

