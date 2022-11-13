import Modal from '../Modal/Modal';
import styles from './Notification.module.scss';

interface NotificationProps {
  onReconnectSocket: () => void;
}

const Notification = ({ onReconnectSocket }: NotificationProps) => {
  const body = <h4>Orderbook Disconnected</h4>;
  const footer = (
    <button
      onClick={onReconnectSocket}
      className={styles.buttonReconnect}
      aria-label="Close"
    >
      RECONNECT
    </button>
  );
  return (
    <Modal
      onClose={onReconnectSocket}
      headerText={'Error!'}
      headerClassName={styles.title}
      body={body}
      footer={footer}
      className={styles.notification}
    />
  );
};

export default Notification;
