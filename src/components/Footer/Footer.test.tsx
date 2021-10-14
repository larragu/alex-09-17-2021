import { render } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import { Markets } from '../../types';
import Footer from './Footer';

describe('Footer component', () => {
  const isConnected = true;
  const selectedMarket = Markets.XBT_USD;
  const toggleHandlerMock = jest.fn();

  const { container, getByText } = render(
    <Footer 
      toggle={toggleHandlerMock}
      isConnected={isConnected}
      selectedMarket={selectedMarket}
    />
  );
  const buttonEl = getByText('Toggle Feed');
  
  test('should render', () => {
    expect(container).toBeTruthy();
    expect(buttonEl).toBeInTheDocument();
  }); 

  test('should toggle market button', () => {
    let newMarket = Markets.NONE;
    const toggleHandlerMock = jest.fn((selectedMarket:Markets)=> {
      newMarket = selectedMarket
    });

    const { container, getByText } = render(
      <Footer 
        toggle={toggleHandlerMock}
        isConnected={isConnected}
        selectedMarket={selectedMarket}
      />
    );

    const buttonEl = getByText('Toggle Feed');

    userEvent.click(buttonEl);
    
    expect(container).toBeTruthy();
    expect(toggleHandlerMock.mock.calls.length).toEqual(1);
    expect(newMarket).toEqual(Markets.ETH_USD);
  }); 

  test('should disable button on disconnection', () => {
    const { container, getByText } = render(
      <Footer 
        toggle={toggleHandlerMock}
        isConnected={!isConnected}
        selectedMarket={selectedMarket}
      />
    );

    const buttonEl = getByText('Toggle Feed');

    userEvent.click(buttonEl);
    
    expect(container).toBeTruthy();
    expect(toggleHandlerMock.mock.calls.length).toEqual(0);
  }); 

})
