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

    const { container } = render(
      <Modal onClose={onClose} message={''} buttonText={''} />
    );

    expect(container).toBeTruthy();
  });

  test('should render ErrorModal component', async () => {
    const reconnectHandlerMock = jest.fn();

    const { container, getByText } = render(
      <Modal
        message="Connection Failed"
        buttonText="RETRY"
        onClose={reconnectHandlerMock}
      />
    );

    const buttonEl = getByText('RETRY');
    await userEvent.click(buttonEl);

    expect(container).toBeTruthy();
    expect(reconnectHandlerMock.mock.calls.length).toEqual(1);
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
