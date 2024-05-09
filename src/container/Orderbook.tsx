import { useCallback, useEffect, useRef } from 'react';
import cn from 'classnames';

import styles from './Orderbook.module.scss';
import { Market, ModalStatus, VisibilityState } from '../types';
import Orders from '../components/Orders';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useSocket from '../hooks/useSocket';
import Modal from '../components/Modal';

const VISIBILITY_CHANGE = 'visibilitychange';
const Orderbook = (): JSX.Element => {
  const {
    isSocketConnected,
    disconnectSocket,
    connectSocket,
    selectedMarket,
    changeMarket,
    connectionError,
    isSubscribed,
  } = useSocket();

  const connectSocketRef = useRef(false);

  useEffect(() => {
    if (!connectSocketRef.current) {
      connectSocketRef.current = true;
      connectSocket(Market.XBT_USD);
    }
  }, [connectSocket]);

  const reconnectSocketHandler = useCallback(() => {
    connectSocket(selectedMarket);
  }, [connectSocket, selectedMarket]);

  const toggleFeedHandler = useCallback(
    (selectedMarket: Market) => {
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
    window.addEventListener(VISIBILITY_CHANGE, toggleConnectionHandler);
    return () =>
      window.removeEventListener(VISIBILITY_CHANGE, toggleConnectionHandler);
  }, [toggleConnectionHandler]);

  const isDisconnectedAndMarketSelected = (): boolean => {
    return !isSocketConnected && selectedMarket !== Market.NONE;
  };

  return (
    <div className={cn(styles.orderbook, { [styles.blur]: !isSubscribed })}>
      {connectionError ? (
        <Modal
          message="Connection Failed"
          buttonText="retry"
          onClose={reconnectSocketHandler}
          status={ModalStatus.ERROR}
        />
      ) : (
        isDisconnectedAndMarketSelected() && (
          <Modal
            message="Orderbook Disconnected"
            buttonText="reconnect"
            onClose={reconnectSocketHandler}
            status={ModalStatus.WARNING}
          />
        )
      )}
      <Header />
      <Orders />
      <Footer
        onToggleFeed={toggleFeedHandler}
        selectedMarket={selectedMarket}
        isToggleFeedEnabled={isSocketConnected}
      />
    </div>
  );
};

export default Orderbook;
