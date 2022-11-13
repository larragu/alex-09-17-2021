import Modal from './../Modal';
import styles from './ErrorModal.module.scss';

interface ErrorModalProps {
  message: string;
  buttonText: string;
  onClose: () => void;
}

const ErrorModal = ({ message, onClose, buttonText }: ErrorModalProps) => {
  const body = <h4>{message}</h4>;
  const footer = (
    <button onClick={onClose} className={styles.button} aria-label="Close">
      {buttonText}
    </button>
  );
  return (
    <Modal
      onClose={onClose}
      headerText={'Error!'}
      headerClassName={styles.title}
      body={body}
      footer={footer}
      className={styles.errorModal}
    />
  );
};

export default ErrorModal;
