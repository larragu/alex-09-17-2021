import React, { useCallback } from "react";
import { Markets } from "../../models";
import store from "../../store";
import { socketActions } from "../../store/socket";

import styles from './Notification.module.css';

interface NotificationProps {
  selectedMarket: Markets
}

const Notification:React.FC<NotificationProps> = ({selectedMarket}) => {
  const reconnectHandler = useCallback(() => {
    store.dispatch(socketActions.connect());
    store.dispatch(socketActions.subscribe({selectedMarket:selectedMarket}));
  }, [selectedMarket]);

  return( 
    <div className={styles['notification']}>
      <button onClick={reconnectHandler}className={styles['reconnect-button']}>Orderbook Disconnected: RECONNECT</button>
    </div>
  );
}

export default React.memo(Notification);