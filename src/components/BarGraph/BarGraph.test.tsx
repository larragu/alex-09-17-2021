import { render } from '@testing-library/react';

import { OrderType } from '../../types';
import BarGraph from './BarGraph';
import { bid } from '../../mocks';

describe('BarGraph component', () => {
  test('should render BarGraph', () => {
    const { container } = render(
      <BarGraph depthArray={bid.depthArray} orderType={OrderType.BID} />
    );

    expect(container).toBeTruthy();
  });
});
