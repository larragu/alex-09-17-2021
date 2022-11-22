import { render } from '@testing-library/react';

import { OrderType } from '../../../../types';
import OrderHeader from './OrderHeader';

describe('OrderHeader component', () => {
  test('should render OrderHeader', () => {
    const ordered = ['TOTAL', 'SIZE', 'PRICE'];
    const tableRow = document.createElement('table');

    const { getAllByRole } = render(<OrderHeader orderType={OrderType.BID} />, {
      container: document.body.appendChild(tableRow),
    });

    const cells = getAllByRole('columnheader');

    cells.forEach((cell, i) => {
      const { innerHTML } = cell;
      expect(innerHTML).toBe(ordered[i]);
    });
  });
});
