import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import Modal from './Modal';

describe('Modal component', () => {
  beforeAll(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'modal-root');
    document.body.appendChild(div);
  });

  test('should render Modal component', () => {
    const onClose = jest.fn();

    const { container } = render(
      <Modal
        onClose={onClose}
        className={''}
        headerText={''}
        headerClassName={''}
        body={undefined}
        footer={undefined}
      />
    );

    expect(container).toBeTruthy();
  });

  test('should click button in modal', () => {
    const onClose = jest.fn();

    const body = <h4>Orderbook Disconnected</h4>;
    const footer = (
      <button onClick={onClose} aria-label="Close">
        RECONNECT
      </button>
    );

    const { container, getByText } = render(
      <Modal
        onClose={onClose}
        headerText={'Error!'}
        body={body}
        footer={footer}
        className={''}
        headerClassName={''}
      />
    );

    expect(container).toBeTruthy();
    const buttonEl = getByText('RECONNECT');
    userEvent.click(buttonEl);

    expect(onClose.mock.calls.length).toEqual(1);
  });
});
