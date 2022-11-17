import { useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';
import { ModalStatus } from '../../types';

interface ModalProps {
  onClose: () => void;
  message: string;
  buttonText: string;
  status?: ModalStatus;
}

const Modal = ({ onClose, message, buttonText, status }: ModalProps) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const headerText =
    status === ModalStatus.ERROR
      ? 'Error!'
      : status === ModalStatus.WARNING
      ? 'Warning!'
      : '';

  return createPortal(
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <FocusLock>
        <div
          className={styles.modal}
          aria-modal
          aria-labelledby={headerText}
          role={status === ModalStatus.WARNING ? 'alertdialog' : 'dialog'}
        >
          <h3
            className={cn(
              styles.title,
              status === ModalStatus.ERROR
                ? styles.error
                : status === ModalStatus.WARNING && styles.warning
            )}
          >
            {headerText}
          </h3>
          <h4 className={styles.body}>{message}</h4>
          <div className={styles.footer}>
            <button
              onClick={onClose}
              className={cn(
                styles.button,
                status === ModalStatus.ERROR
                  ? styles.error
                  : status === ModalStatus.WARNING && styles.warning
              )}
              aria-label="Close"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </FocusLock>
    </>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
