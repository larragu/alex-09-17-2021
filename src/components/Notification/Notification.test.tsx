import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Notification from './Notification';

describe('Notification component', () => {
  test('should render Notification component', () => {
    const reconnectHandlerMock = jest.fn();

    const { container, getByText } = render(
      <Notification onReconnectSocket={reconnectHandlerMock} />
    );

    const buttonEl = getByText('Orderbook Disconnected: RECONNECT');
    userEvent.click(buttonEl);

    expect(container).toBeTruthy();
    expect(reconnectHandlerMock.mock.calls.length).toEqual(1);
  });
});
