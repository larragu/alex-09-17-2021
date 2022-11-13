import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Notification from './Notification';

describe('Notification component', () => {
  beforeAll(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'modal-root');
    document.body.appendChild(div);
  });

  test('should render Notification component', () => {
    const reconnectHandlerMock = jest.fn();

    const { container, getByText } = render(
      <Notification onReconnectSocket={reconnectHandlerMock} />
    );

    const buttonEl = getByText('RECONNECT');
    userEvent.click(buttonEl);

    expect(container).toBeTruthy();
    expect(reconnectHandlerMock.mock.calls.length).toEqual(1);
  });
});
