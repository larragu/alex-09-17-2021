import { useCallback, useEffect } from 'react';
import cn from 'classnames';

import styles from './Orderbook.module.scss';
import { Market, VisibilityState } from '../types';
import Orders from '../components/Orders';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useSocket from '../hooks/useSocket';
import ErrorModal from '../components/ErrorModal';

const VISIBILITY_CHANGE = 'visibilitychange';
let isLoaded = false;
const Orderbook = () => {
  const {
    isSocketConnected,
    disconnectSocket,
    connectSocket,
    selectedMarket,
    changeMarket,
    connectionError,
    isSubscribed,
  } = useSocket();

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
    <div className={cn(styles.orderbook, { [styles.blur]: !isSubscribed })}>
      {connectionError && (
        <ErrorModal
          message="Connection Failed"
          buttonText="RETRY"
          onClose={reconnectSocketHandler}
        />
      )}
      {isLoaded && !isSocketConnected && (
        <ErrorModal
          message="Orderbook Disconnected"
          buttonText="RECONNECT"
          onClose={reconnectSocketHandler}
        />
      )}
      <Header />
      <Orders />
      <Footer
        onToggle={toggleHandler}
        selectedMarket={selectedMarket}
        isDisabled={!isSocketConnected || !isSubscribed}
      />
    </div>
  );
};

export default Orderbook;
