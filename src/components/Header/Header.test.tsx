import { render } from '@testing-library/react';

import Header from './Header';

jest.mock('react-redux');

describe('Header component', () => {
  test('should render Header', () => {
    const { container, getByText } = render(<Header />);

    const spreadElement = getByText(/Spread/i);

    expect(container).toBeTruthy();
    expect(spreadElement).toBeInTheDocument();
  });
});
