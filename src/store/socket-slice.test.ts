import { Market } from '../types';
import socketSlice, {
  initialSocketState,
  connectToSocket,
  connectSuccess,
  disconnectFromSocket,
  subscribeToMarket,
  subscribeSuccess,
  unsubscribeFromMarket,
  unsubscribeSuccess,
  connectError,
  disconnectSuccess,
} from './socket-slice';
import * as socketMiddleware from './socketMiddleware';
import * as OrderbookSocket from '../OrderbookSocket';

describe('Socket slice', () => {
  test('should have initial state', () => {
    expect(socketSlice(undefined, { type: undefined })).toEqual(
      initialSocketState
    );

    expect(socketSlice(undefined, { type: undefined })).toEqual(
      initialSocketState
    );
  });

  test('should change state to connect', () => {
    expect(socketSlice(initialSocketState, connectToSocket())).toEqual({
      ...initialSocketState,
      isConnecting: true,
    });
  });

  test('should change state to connected', () => {
    expect(socketSlice(initialSocketState, connectSuccess())).toEqual({
      ...initialSocketState,
      isConnected: true,
    });
  });

  test('should change state to disconnecting', () => {
    expect(socketSlice(initialSocketState, disconnectFromSocket())).toEqual({
      ...initialSocketState,
      isConnecting: false,
    });
  });

  test('should change state to subscribing', () => {
    const mockState = { ...initialSocketState, isConnected: true };

    expect(socketSlice(mockState, subscribeToMarket(Market.ETH_USD))).toEqual({
      ...mockState,
      isSubscribing: true,
    });
  });

  test('should change state to subscribed', () => {
    const mockState = {
      ...initialSocketState,
      isConnected: true,
      isSubscribing: true,
      isSubscribed: false,
    };

    expect(socketSlice(mockState, subscribeSuccess())).toEqual({
      ...mockState,
      isSubscribing: false,
      isSubscribed: true,
    });
  });

  test('should change state to unsubscribing', () => {
    const mockState = {
      ...initialSocketState,
      isConnected: true,
      isSubscribed: true,
    };
    expect(
      socketSlice(mockState, unsubscribeFromMarket(Market.ETH_USD))
    ).toEqual({
      ...mockState,
    });
  });

  test('should change state to unsubscribed', () => {
    const mockState = { ...initialSocketState, isConnected: true };
    expect(socketSlice(mockState, unsubscribeSuccess())).toEqual({
      ...mockState,
      isSubscribed: false,
    });
  });

  test('should change state to disconnected and unsubscribed on disconnect', () => {
    const mockState = {
      ...initialSocketState,
      isConnected: true,
      isSubscribed: true,
    };

    expect(socketSlice(mockState, disconnectSuccess())).toEqual({
      ...mockState,
      isConnected: false,
      isSubscribed: false,
    });
  });

  test('should change state to connection error', () => {
    expect(socketSlice(initialSocketState, connectError())).toEqual({
      ...initialSocketState,
      isConnected: false,
      isSubscribed: false,
      connectionError: true,
    });
  });
});
