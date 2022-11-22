import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Market } from '../../types';
import Footer from './Footer';

describe('Footer component', () => {
  const isConnected = false;
  const selectedMarket = Market.XBT_USD;
  const toggleHandlerMock = jest.fn();

  const { getByRole } = render(
    <Footer
      onToggle={toggleHandlerMock}
      isDisabled={isConnected}
      selectedMarket={selectedMarket}
    />
  );
  test('should render', () => {
    expect(getByRole('button')).toHaveTextContent('Toggle Feed');
  });

  test('should toggle market button', async () => {
    let newMarket = Market.NONE;
    const toggleHandlerMock = jest.fn((selectedMarket: Market) => {
      newMarket = selectedMarket;
    });

    const { getByRole } = render(
      <Footer
        onToggle={toggleHandlerMock}
        isDisabled={isConnected}
        selectedMarket={selectedMarket}
      />
    );

    const buttonEl = getByRole('button');

    await userEvent.click(buttonEl);

    expect(toggleHandlerMock.mock.calls.length).toEqual(1);
    expect(newMarket).toEqual(Market.ETH_USD);
  });

  test('should disable button on disconnection', () => {
    const { getByRole } = render(
      <Footer
        onToggle={toggleHandlerMock}
        isDisabled={!isConnected}
        selectedMarket={selectedMarket}
      />
    );

    const buttonEl = getByRole('button');

    userEvent.click(buttonEl);

    expect(toggleHandlerMock.mock.calls.length).toEqual(0);
  });
});
