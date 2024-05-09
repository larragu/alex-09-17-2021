import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Market } from '../../types';
import Footer from './Footer';

describe('Footer component', () => {
  const isConnected = false;
  const selectedMarket = Market.XBT_USD;
  const toggleFeedHandlerMock = jest.fn();

  render(
    <Footer
      onToggleFeed={toggleFeedHandlerMock}
      isToggleFeedEnabled={isConnected}
      selectedMarket={selectedMarket}
    />
  );
  test('should render', () => {
    expect(screen.getByRole('button')).toHaveTextContent('Toggle Feed');
  });

  test('should toggle market button', async () => {
    let newMarket = Market.NONE;
    const toggleFeedHandlerMock = jest.fn((selectedMarket: Market) => {
      newMarket = selectedMarket;
    });

    render(
      <Footer
        onToggleFeed={toggleFeedHandlerMock}
        isToggleFeedEnabled={!isConnected}
        selectedMarket={selectedMarket}
      />
    );

    const buttonEl = screen.getByRole('button');

    await userEvent.click(buttonEl);

    expect(toggleFeedHandlerMock.mock.calls.length).toEqual(1);
    expect(newMarket).toEqual(Market.ETH_USD);
  });

  test('should disable button on disconnection', () => {
    render(
      <Footer
        onToggleFeed={toggleFeedHandlerMock}
        isToggleFeedEnabled={isConnected}
        selectedMarket={selectedMarket}
      />
    );

    const buttonEl = screen.getByRole('button');

    userEvent.click(buttonEl);

    expect(toggleFeedHandlerMock.mock.calls.length).toEqual(0);
  });
});
