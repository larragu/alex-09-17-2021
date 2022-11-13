import { render } from '@testing-library/react';

import Orders from './Orders';
import { initialResult } from '../../mocks';
import * as hooks from '../../hooks';

describe('Orders component', () => {
  test('should render Orders for mobile', () => {
    const useSelectorMock = jest.spyOn(hooks, 'useAppSelector');
    useSelectorMock.mockReturnValue({
      bid: initialResult.bid,
      ask: initialResult.ask,
    });

    const { container, getByText } = render(<Orders />);

    const spreadElement = getByText(/Spread/i);

    expect(container).toBeTruthy();
    expect(spreadElement).toBeInTheDocument();
  });
});
