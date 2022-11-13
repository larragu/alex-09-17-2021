import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ErrorModal from './ErrorModal';

describe('ErrorModal component', () => {
  beforeAll(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'modal-root');
    document.body.appendChild(div);
  });

  test('should render ErrorModal component', async () => {
    const reconnectHandlerMock = jest.fn();

    const { container, getByText } = render(
      <ErrorModal
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
});
