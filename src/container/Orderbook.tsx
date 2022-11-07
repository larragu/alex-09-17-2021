import { useCallback, useEffect } from 'react';

import styles from './Orderbook.module.scss';
import { Market, VisibilityState } from '../types';
import Orders from '../components/Orders';
import Notification from '../components/Notification';
import Header from '../components/Header';
import useMediaQuery from '../hooks/useMediaQuery';
import Footer from '../components/Footer';
import useSocket from '../hooks/useSocket';
import { DESKTOP_MEDIA } from '../constants';

const VISIBILITY_CHANGE = 'visibilitychange';
let isLoaded = false;
const Orderbook = () => {
  const {
    isSocketConnected,
    disconnectSocket,
    connectSocket,
    selectedMarket,
    changeMarket,
  } = useSocket();

  let isDesktop = useMediaQuery(DESKTOP_MEDIA);

  const reconnectSocketHandler = useCallback(() => {
    connectSocket(selectedMarket);
  }, [connectSocket, selectedMarket]);

  const toggleHandler = useCallback(
    (selectedMarket) => {
      changeMarket(selectedMarket);
    },
    [changeMarket]
  );

  const toggleConnectionHandler = useCallback(() => {
    if (document.visibilityState === VisibilityState.HIDDEN) {
      disconnectSocket();
    }
  }, [disconnectSocket]);

  useEffect(() => {
    connectSocket(Market.XBT_USD);
  }, [connectSocket]);

  useEffect(() => {
    window.addEventListener(VISIBILITY_CHANGE, toggleConnectionHandler);
    return () =>
      window.removeEventListener(VISIBILITY_CHANGE, toggleConnectionHandler);
  }, [toggleConnectionHandler]);

  if (isSocketConnected) {
    isLoaded = true;
  }

  return (
    <div className={styles['orderbook']}>
      {isLoaded && !isSocketConnected && (
        <Notification onReconnectSocket={reconnectSocketHandler} />
      )}
      <Header isDesktop={isDesktop} />
      <Orders isDesktop={isDesktop} />
      <Footer
        onToggle={toggleHandler}
        selectedMarket={selectedMarket}
        isSocketConnected={isSocketConnected!}
      />
    </div>
  );
};

export default Orderbook;
