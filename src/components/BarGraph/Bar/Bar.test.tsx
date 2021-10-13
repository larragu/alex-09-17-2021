import { render } from '@testing-library/react';

import { OrderType } from '../../../types';
import Bar from './Bar';

test('should render Bar', () => {
  const { container } = render(
    <Bar 
      percent={59.4587}
      isDesktop={false}
      orderType={OrderType.BID}
    />
  );

  expect(container).toBeTruthy();
}); 
