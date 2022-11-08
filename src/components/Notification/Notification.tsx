import styles from './Notification.module.scss';

interface NotificationProps {
  onReconnectSocket: () => void;
}

const Notification = ({ onReconnectSocket }: NotificationProps) => {
  return (
    <button onClick={onReconnectSocket} className={styles.buttonReconnect}>
      Orderbook Disconnected: RECONNECT
    </button>
  );
};

export default Notification;
