import { render } from '@testing-library/react';
import * as redux from 'react-redux';

import { initialResult } from '../mocks';
import useSocket from '../hooks/useSocket';
import Orderbook from './Orderbook';
import { Market } from '../types';
import * as hooks from '../hooks';

jest.mock('../hooks/useSocket');

describe('Orderbook component', () => {
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
});
