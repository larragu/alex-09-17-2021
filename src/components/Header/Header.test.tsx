import { render, screen } from '@testing-library/react';

import Header from './Header';

jest.mock('react-redux');

test('should render Header for mobile', () => {
  const { container } = render(
    <Header 
      isDesktop={false}
    />
  );
 
  const spreadElement = screen.queryByText(/Spread/i);

  expect(container).toBeTruthy();
  expect(spreadElement).not.toBeInTheDocument();
}); 

test('should render Header for desktop', () => {

  const { container, getByText } = render(
    <Header 
      isDesktop={true}
    />
  );
 
  const spreadElement = getByText(/Spread/i);

  expect(container).toBeTruthy();
  expect(spreadElement).toBeInTheDocument();
}); 