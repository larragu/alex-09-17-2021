import { render, screen } from '@testing-library/react';
import OrderRow from './OrderRow';
import { OrderType } from '../../../../types';

const mockData = {
  type: OrderType.BID,
  total: 9616,
  size: 5033,
  price: 54777.5,
  totalFormatted: "9,616",
  priceFormatted: "54,777.50",
  sizeFormatted: "5,033"
};

test('renders OrderRow bid for mobile', () => {

  const isDesktop = false;
  const ordered = [mockData.priceFormatted, mockData.sizeFormatted, mockData.totalFormatted];
  const tableRow = document.createElement('tbody');
  
  const { container } = render(
    <OrderRow 
      key={`${mockData.type}:${mockData.price}`} 
      total={mockData.total} 
      size={mockData.size} 
      price={mockData.price} 
      orderType={mockData.type} 
      isDesktop={isDesktop}
    />, {
      container: document.body.appendChild(tableRow)
    }
  );

  const cells = screen.getAllByRole('cell');

  expect(container).toBeTruthy();

  const totalElement = screen.getByText(mockData.totalFormatted);
  expect(totalElement).toBeInTheDocument();

  const priceElement = screen.getByText(mockData.priceFormatted);
  expect(priceElement).toBeInTheDocument();

  const sizeElement = screen.getByText(mockData.sizeFormatted);
  expect(sizeElement).toBeInTheDocument();

  cells.forEach((cell,i) => {
    const { innerHTML } = (cell)
    expect(innerHTML).toBe(ordered[i]);
  })

});

test('renders OrderRow bid for desktop', () => {
  const isDesktop = true;

  const ordered = [mockData.totalFormatted, mockData.sizeFormatted, mockData.priceFormatted];

  const tableRow = document.createElement('tbody');
  
  render(
    <OrderRow 
      key={`${mockData.type}:${mockData.price}`} 
      total={mockData.total} 
      size={mockData.size} 
      price={mockData.price} 
      orderType={mockData.type} 
      isDesktop={isDesktop}
    />, {
      container: document.body.appendChild(tableRow)
    }
  );

  const cells = screen.getAllByRole('cell');

  cells.forEach((cell,i) => {
    const { innerHTML } = (cell)
    expect(innerHTML).toBe(ordered[i]);
  })
});