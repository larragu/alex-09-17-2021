import { render } from '@testing-library/react';

import Spread from './Spread';
import { initialResult } from '../../mocks';
import * as hooks from '../../hooks';

describe('Spread component', () => {
  test('should render Spread', () => {
    const useAppSelectorMock = jest.spyOn(hooks, 'useAppSelector');
    useAppSelectorMock.mockReturnValueOnce(initialResult.bid.highestBidPrice);
    useAppSelectorMock.mockReturnValueOnce(initialResult.ask.lowestAskPrice);

    const { container, getByText } = render(<Spread />);

    const headerElement = getByText('Spread: 13.0 (0.03%)');

    expect(container).toBeTruthy();
    expect(headerElement).toBeInTheDocument();
  });
});
