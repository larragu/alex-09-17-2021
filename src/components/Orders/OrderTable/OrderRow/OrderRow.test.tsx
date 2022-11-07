import { render, screen } from '@testing-library/react';

import OrderRow from './OrderRow';
import { OrderType } from '../../../../types';

const mockData = {
  type: OrderType.BID,
  total: 9616,
  size: 5033,
  price: 54777.5,
  totalFormatted: '9,616',
  priceFormatted: '54,777.50',
  sizeFormatted: '5,033',
};

describe('Footer component', () => {
  test('should render OrderRow bid', () => {
    const ordered = [
      mockData.totalFormatted,
      mockData.sizeFormatted,
      mockData.priceFormatted,
    ];

    const tableRow = document.createElement('tbody');

    render(
      <OrderRow
        key={`${mockData.type}:${mockData.price}`}
        total={mockData.total}
        size={mockData.size}
        price={mockData.price}
        orderType={mockData.type}
      />,
      {
        container: document.body.appendChild(tableRow),
      }
    );

    const cells = screen.getAllByRole('cell');

    cells.forEach((cell, i) => {
      const { innerHTML } = cell;
      expect(innerHTML).toBe(ordered[i]);
    });
  });
});
