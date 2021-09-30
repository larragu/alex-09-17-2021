import React from "react";

import styles from './Notification.module.css';

interface NotificationProps {
  reconnect: ()=>void;
}

const Notification:React.FC<NotificationProps> = ({reconnect}) => {
  const reconnectHandler = () => {
    reconnect();
  }

  return( 
      <button onClick={reconnectHandler}className={styles['reconnect-button']}>
        Orderbook Disconnected: RECONNECT
      </button>
  );
}

export default Notification;