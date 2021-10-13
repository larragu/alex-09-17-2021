import { useCallback, useEffect } from "react";

import styles from './Orderbook.module.scss';
import { Markets, VisibilityState } from "../types";
import Orders from "../components/Orders/Orders";
import Notification from "../components/Notification/Notification";
import Header from "../components/Header/Header";
import useMediaQuery from "../hooks/useMediaQuery";
import Footer from "../components/Footer/Footer";
import useSocket from '../hooks/useSocket';
import { DESKTOP_MEDIA } from "../constants";

const VISIBILITY_CHANGE = "visibilitychange";
let isLoaded = false;
const Orderbook = () => {
  const {
    isConnected,
    disconnect,
    connect,
    selectedMarket,
    changeMarket
  } = useSocket();
  
  let isDesktop = useMediaQuery(DESKTOP_MEDIA)

  const reconnectHandler = useCallback(() => {
    connect(selectedMarket);
  }, [connect, selectedMarket]);

  const toggleHandler = useCallback((selectedMarket) => {
    changeMarket(selectedMarket);
  },[changeMarket])

  const toggleConnectionHandler = useCallback(() => {
    if(document.visibilityState === VisibilityState.HIDDEN) {
      disconnect();
    }
  }, [disconnect])

  useEffect(() => {
    connect(Markets.XBT_USD);
  }, [connect]);

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
      <Header isDesktop={isDesktop}/>
      <Orders isDesktop={isDesktop}/>
      <Footer toggle={toggleHandler} selectedMarket={selectedMarket} isConnected={isConnected!} />
    </div>
  );
};

export default Orderbook;

