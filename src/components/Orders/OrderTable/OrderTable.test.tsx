import { render, screen } from '@testing-library/react';

import OrderTable from './OrderTable';
import { OrderType } from '../../../types';
import { bid as bidMock, ask as askMock } from '../../../mocks';

describe('OrderTable component', () => {
  test('should render OrderTable ask feed', () => {
    render(<OrderTable feed={bidMock} orderType={OrderType.ASK} />);

    const columnHeaders = screen.getAllByRole('columnheader');

    expect(columnHeaders.length).toEqual(3);
  });

  test('should render OrderTable bid feed', () => {
    render(<OrderTable feed={askMock} orderType={OrderType.BID} />);

    const columnHeaders = screen.getAllByRole('columnheader');

    expect(columnHeaders.length).toEqual(3);
  });
});
