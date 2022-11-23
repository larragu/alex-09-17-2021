import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './Modal';
import { ModalStatus } from '../../types';

describe('Modal component', () => {
  beforeAll(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'modal-root');
    document.body.appendChild(div);
  });
  test('should render Modal component', () => {
    const onClose = jest.fn();

    render(<Modal onClose={onClose} message={''} buttonText={''} />);

    const modal = screen.getByRole('dialog');

    expect(modal).toBeTruthy();
  });

  test('should render Error Modal', async () => {
    const reconnectHandlerMock = jest.fn();

    render(
      <Modal
        message="Connection Failed"
        buttonText="RETRY"
        onClose={reconnectHandlerMock}
        status={ModalStatus.ERROR}
      />
    );

    const buttonEl = screen.getByText('RETRY');

    expect(buttonEl).toBeTruthy();
  });

  test('should render Warning Modal', async () => {
    const reconnectHandlerMock = jest.fn();

    render(
      <Modal
        message="Orderbook Disconnected"
        buttonText="reconnect"
        onClose={reconnectHandlerMock}
        status={ModalStatus.WARNING}
      />
    );

    const modal = screen.getByRole('alertdialog');

    expect(modal).toBeTruthy();
  });

  test('should click button in modal', async () => {
    const onClose = jest.fn();

    render(
      <Modal
        onClose={onClose}
        message="Orderbook Disconnected"
        buttonText="RECONNECT"
        status={ModalStatus.ERROR}
      />
    );

    const buttonEl = screen.getByRole('button');

    expect(buttonEl).toHaveTextContent('RECONNECT');

    await userEvent.click(buttonEl);

    expect(onClose.mock.calls.length).toEqual(1);
  });

  test('should press escape key and close modal', async () => {
    const onClose = jest.fn();

    render(
      <Modal
        onClose={onClose}
        message="Orderbook Disconnected"
        buttonText="RECONNECT"
        status={ModalStatus.ERROR}
      />
    );

    await fireEvent.keyDown(screen.getByRole('dialog'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    expect(onClose.mock.calls.length).toEqual(1);
  });

  test('should press other key and not close modal', async () => {
    const onClose = jest.fn();

    render(
      <Modal
        onClose={onClose}
        message="Orderbook Disconnected"
        buttonText="RECONNECT"
        status={ModalStatus.ERROR}
      />
    );

    await fireEvent.keyDown(screen.getByRole('dialog'), {
      key: 'enter',
      keyCode: 13,
    });

    expect(onClose.mock.calls.length).toEqual(0);
  });
});
