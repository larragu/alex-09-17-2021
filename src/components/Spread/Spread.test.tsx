import { render } from '@testing-library/react';
import * as redux from 'react-redux'

import Spread from './Spread';
import { initialResult } from '../../mocks'

describe('Spread component', () => {
  test('should render Spread', () => {
    const useSelectorMock = jest.spyOn(redux, 'useSelector');
    useSelectorMock.mockReturnValueOnce(initialResult.bid.highestBidPrice);
    useSelectorMock.mockReturnValueOnce(initialResult.ask.lowestAskPrice)

    const { container, getByText } = render(
      <Spread />
    );
  
    const headerElement = getByText('Spread: 13.0 (0.03%)');

    expect(container).toBeTruthy();
    expect(headerElement).toBeInTheDocument();
  }); 
});