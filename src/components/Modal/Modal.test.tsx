import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
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

    const { getByRole } = render(
      <Modal onClose={onClose} message={''} buttonText={''} />
    );

    const modal = getByRole('dialog');

    expect(modal).toBeTruthy();
  });

  test('should render Error Modal', async () => {
    const reconnectHandlerMock = jest.fn();

    const { getByText } = render(
      <Modal
        message="Connection Failed"
        buttonText="RETRY"
        onClose={reconnectHandlerMock}
        status={ModalStatus.ERROR}
      />
    );

    const buttonEl = getByText('RETRY');

    expect(buttonEl).toBeTruthy();
  });

  test('should render Warning Modal', async () => {
    const reconnectHandlerMock = jest.fn();

    const { container, getByRole } = render(
      <Modal
        message="Orderbook Disconnected"
        buttonText="reconnect"
        onClose={reconnectHandlerMock}
        status={ModalStatus.WARNING}
      />
    );

    const modal = getByRole('alertdialog');

    expect(container).toBeTruthy();
    expect(modal).toBeTruthy();
  });

  test('should click button in modal', async () => {
    const onClose = jest.fn();

    const { container, getByText } = render(
      <Modal
        onClose={onClose}
        message="Orderbook Disconnected"
        buttonText="RECONNECT"
        status={ModalStatus.ERROR}
      />
    );

    expect(container).toBeTruthy();
    const buttonEl = getByText('RECONNECT');

    await userEvent.click(buttonEl);

    expect(onClose.mock.calls.length).toEqual(1);
  });
});
