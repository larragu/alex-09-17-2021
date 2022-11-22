import { render } from '@testing-library/react';

import OrderTable from './OrderTable';
import { OrderType } from '../../../types';
import { bid as bidMock, ask as askMock } from '../../../mocks';

describe('OrderTable component', () => {
  test('should render OrderTable ask feed', () => {
    const { getAllByRole } = render(
      <OrderTable feed={bidMock} orderType={OrderType.ASK} />
    );

    const columnHeaders = getAllByRole('columnheader');

    expect(columnHeaders.length).toEqual(3);
  });

  test('should render OrderTable bid feed', () => {
    const { getAllByRole } = render(
      <OrderTable feed={askMock} orderType={OrderType.BID} />
    );

    const columnHeaders = getAllByRole('columnheader');

    expect(columnHeaders.length).toEqual(3);
  });
});
