import { render } from '@testing-library/react';

import { initialResult } from '../mocks';
import useSocket from '../hooks/useSocket';
import Orderbook from './Orderbook';
import { Market } from '../types';
import * as hooks from '../hooks';
import userEvent from '@testing-library/user-event';

jest.mock('../hooks/useSocket');

describe('Orderbook component', () => {
  beforeAll(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'modal-root');
    document.body.appendChild(div);
  });

  test('should render Orderbook', () => {
    (useSocket as jest.Mock).mockReturnValue({
      isSocketConnected: false,
      disconnectSocket: false,
      connectSocket: jest.fn(),
      selectedMarket: Market.NONE,
      changeMarket: jest.fn(),
    });

    const useAppSelectorMock = jest.spyOn(hooks, 'useAppSelector');
    useAppSelectorMock.mockReturnValue(initialResult);

    const { container } = render(<Orderbook />);

    expect(container).toBeTruthy();
  });

  test('should display an error Modal on connection error', () => {
    (useSocket as jest.Mock).mockReturnValue({
      isSocketConnected: false,
      disconnectSocket: false,
      connectionError: true,
      connectSocket: jest.fn(),
      selectedMarket: Market.NONE,
      changeMarket: jest.fn(),
    });
    const useAppSelectorMock = jest.spyOn(hooks, 'useAppSelector');
    useAppSelectorMock.mockReturnValue(initialResult);

    const { getByRole } = render(<Orderbook />);

    expect(getByRole('heading', { level: 4 })).toHaveTextContent(
      'Connection Failed'
    );
  });

  test('should display a warning Modal on disconnection', () => {
    (useSocket as jest.Mock).mockReturnValue({
      isSocketConnected: false,
      disconnectSocket: true,
      connectSocket: jest.fn(),
      selectedMarket: Market.XBT_USD,
      changeMarket: jest.fn(),
    });
    const useAppSelectorMock = jest.spyOn(hooks, 'useAppSelector');
    useAppSelectorMock.mockReturnValue(initialResult);

    const { getByRole } = render(<Orderbook />);

    expect(getByRole('heading', { level: 4 })).toHaveTextContent(
      'Orderbook Disconnected'
    );
  });
});
