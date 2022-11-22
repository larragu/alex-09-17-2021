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

    const { getByRole } = render(<Orders />);

    expect(getByRole('heading', { level: 2 })).toHaveTextContent(/Spread/i);
  });
});
