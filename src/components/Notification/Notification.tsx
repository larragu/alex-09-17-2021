import React from "react";

import styles from './Notification.module.scss';

interface NotificationProps {
  reconnect: ()=>void;
}

const Notification:React.FC<NotificationProps> = ({reconnect}) => {
  const reconnectHandler = () => {
    reconnect();
  }

  return( 
      <button onClick={reconnectHandler}className={styles['button-reconnect']}>
        Orderbook Disconnected: RECONNECT
      </button>
  );
}

export default Notification;