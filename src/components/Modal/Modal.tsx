import { ReactNode, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

interface ModalProps {
  onClose: () => void;
  className: string;
  headerText: string;
  headerClassName: string;
  body: ReactNode;
  footer: ReactNode;
}

const Modal = ({
  onClose,
  className,
  headerText,
  headerClassName,
  body,
  footer,
}: ModalProps) => {
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
  return createPortal(
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <FocusLock>
        <div
          className={cn(styles.modal, className)}
          aria-modal={true}
          aria-labelledby={headerText}
          role={'dialog'}
        >
          <h3 className={cn(styles.title, headerClassName)}>{headerText}</h3>
          {body}
          {footer}
        </div>
      </FocusLock>
    </>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
