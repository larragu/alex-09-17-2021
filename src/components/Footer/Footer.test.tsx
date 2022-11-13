import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Market } from '../../types';
import Footer from './Footer';

describe('Footer component', () => {
  const isConnected = false;
  const selectedMarket = Market.XBT_USD;
  const toggleHandlerMock = jest.fn();

  const { container, getByText } = render(
    <Footer
      onToggle={toggleHandlerMock}
      isDisabled={isConnected}
      selectedMarket={selectedMarket}
    />
  );
  const buttonEl = getByText('Toggle Feed');

  test('should render', () => {
    expect(container).toBeTruthy();
    expect(buttonEl).toBeInTheDocument();
  });

  test('should toggle market button', async () => {
    let newMarket = Market.NONE;
    const toggleHandlerMock = jest.fn((selectedMarket: Market) => {
      newMarket = selectedMarket;
    });

    const { container, getByText } = render(
      <Footer
        onToggle={toggleHandlerMock}
        isDisabled={isConnected}
        selectedMarket={selectedMarket}
      />
    );

    const buttonEl = getByText('Toggle Feed');

    await userEvent.click(buttonEl);

    expect(container).toBeTruthy();
    expect(toggleHandlerMock.mock.calls.length).toEqual(1);
    expect(newMarket).toEqual(Market.ETH_USD);
  });

  test('should disable button on disconnection', () => {
    const { container, getByText } = render(
      <Footer
        onToggle={toggleHandlerMock}
        isDisabled={!isConnected}
        selectedMarket={selectedMarket}
      />
    );

    const buttonEl = getByText('Toggle Feed');

    userEvent.click(buttonEl);

    expect(container).toBeTruthy();
    expect(toggleHandlerMock.mock.calls.length).toEqual(0);
  });
});
