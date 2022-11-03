import React from 'react';

import styles from './Notification.module.scss';

interface NotificationProps {
  onReconnectSocket: () => void;
}

const Notification = ({ onReconnectSocket }: NotificationProps) => {
  return (
    <button onClick={onReconnectSocket} className={styles['button-reconnect']}>
      Orderbook Disconnected: RECONNECT
    </button>
  );
};

export default Notification;
