import { render } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import Notification from './Notification';

test('renders Notification component', () => {
  const reconnectHandlerMock = jest.fn();

  const { container, getByText } = render(
    <Notification 
      reconnect={reconnectHandlerMock}
    />
  );

  const buttonEl = getByText('Orderbook Disconnected: RECONNECT');
  userEvent.click(buttonEl);
 
  expect(container).toBeTruthy();
  expect(reconnectHandlerMock.mock.calls.length).toEqual(1);
}); 