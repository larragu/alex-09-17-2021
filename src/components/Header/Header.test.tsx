import { render } from '@testing-library/react';

import Header from './Header';

jest.mock('react-redux');

describe('Header component', () => {
  test('should render Header', () => {
    const { getByRole } = render(<Header />);

    expect(getByRole('heading', { level: 1 })).toHaveTextContent('Order Book');

    expect(getByRole('heading', { level: 2 })).toHaveTextContent(/Spread/i);
  });
});
