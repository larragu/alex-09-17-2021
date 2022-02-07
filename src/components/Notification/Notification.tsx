import React from "react";

import styles from './Notification.module.scss';

interface NotificationProps {
  reconnectSocket: ()=>void;
}

const Notification:React.FC<NotificationProps> = ({reconnectSocket}) => {
  const reconnectSocketHandler = () => {
    reconnectSocket();
  }

  return( 
      <button onClick={reconnectSocketHandler}className={styles['button-reconnect']}>
        Orderbook Disconnected: RECONNECT
      </button>
  );
}

export default Notification;