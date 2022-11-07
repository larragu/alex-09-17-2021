import { render } from '@testing-library/react';
import * as redux from 'react-redux';

import Orders from './Orders';
import { initialResult } from '../../mocks';

jest.mock('../../hooks/useMediaQuery');

describe('Orders component', () => {
  test('should render Orders for mobile', () => {
    const useSelectorMock = jest.spyOn(redux, 'useSelector');
    useSelectorMock.mockReturnValue({
      bid: initialResult.bid,
      ask: initialResult.ask,
    });

    const { container, getByText } = render(<Orders isDesktop={false} />);

    const spreadElement = getByText(/Spread/i);

    expect(container).toBeTruthy();
    expect(spreadElement).toBeInTheDocument();
  });
});
