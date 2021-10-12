import { render, screen } from '@testing-library/react';
import OrderTable from './OrderTable';
import { OrderType } from '../../../types';
import { bid as bidMock, ask as askMock } from '../../../mocks';

jest.mock('../../../hooks/useMediaQuery');

test('renders OrderTable ask feed for mobile', () => {
  const { container, getAllByRole } = render(
    <OrderTable 
      feed={bidMock}
      orderType={OrderType.ASK}
    />
  );
  
  const columnHeaders = getAllByRole('columnheader');

  expect(container).toBeTruthy();
  expect(columnHeaders.length).toEqual(3);
}); 

test('renders OrderTable bid feed for mobile', () => {
  const { container } = render(
    <OrderTable 
      feed={askMock}
      orderType={OrderType.BID}
    />
  );
  const columnHeader = screen.queryByText('SIZE')

  expect(container).toBeTruthy();
  expect(columnHeader).not.toBeInTheDocument();
}); 