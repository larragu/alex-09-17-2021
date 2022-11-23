import { render, screen } from '@testing-library/react';

import Header from './Header';

jest.mock('react-redux');

describe('Header component', () => {
  test('should render Header', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Order Book'
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /Spread/i
    );
  });
});
