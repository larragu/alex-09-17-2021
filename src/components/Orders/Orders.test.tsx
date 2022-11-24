import { render, screen } from '@testing-library/react';

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

    render(<Orders />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /Spread/i
    );
  });
});
