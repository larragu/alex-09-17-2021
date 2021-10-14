import { render } from '@testing-library/react';
import * as redux from 'react-redux'

import { initialResult } from '../mocks'
import useSocket from '../hooks/useSocket';
import Orderbook from './Orderbook';
import { Markets } from '../types';

jest.mock('../hooks/useMediaQuery');
jest.mock('../hooks/useSocket');

describe('Orderbook component', () => {

  test('should render Orderbook', () => {

  (useSocket as jest.Mock)
    .mockReturnValue({
      isConnected: false,
      disconnect: false,
      connect: jest.fn(),
      selectedMarket: Markets.NONE,
      changeMarket: jest.fn()
    });

    const useSelectorMock = jest.spyOn(redux, 'useSelector');
    useSelectorMock.mockReturnValue(initialResult);

    const { container } = render(
      <Orderbook />
    );

    expect(container).toBeTruthy();
  });
});