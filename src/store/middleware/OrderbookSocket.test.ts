import { Server } from 'mock-socket';

import orderbookSocket from './OrderbookSocket';
import { changeMarket } from '../feed-slice';
import {
  connectSuccess,
  disconnectSuccess,
  subscribeSuccess,
  unsubscribeSuccess,
} from '../socket-slice';
import { Market } from '../../types';
import { MockSocketClient } from '../../mocks/MockSocketClient';

describe('OrderbookSocket', () => {
  const fakeURL = 'wss://test';
  const dispatchMock = jest.fn();
  let mockServer: Server;

  beforeEach(() => {
    mockServer = new Server(fakeURL);
    const socketMockClient = new MockSocketClient(fakeURL);
    orderbookSocket.open(socketMockClient, dispatchMock);
  });

  test('should create a succesful connection', (t) => {
    setTimeout(() => {
      mockServer.stop(t);
      expect(dispatchMock).toHaveBeenCalledWith(connectSuccess());
      expect(dispatchMock).toHaveBeenCalledWith(
        changeMarket({ selectedMarket: Market.NONE })
      );
    }, 100);
  });

  test('should call "subscribeToMarket"', (t) => {
    mockServer.on('connection', (socket) => {
      socket.on('message', (data) => {
        socket.send('{"event": "subscribed", "product_ids":["PI_ETHUSD"]}');
      });
    });

    const newMarket = Market.ETH_USD;

    orderbookSocket.subscribeToMarket(newMarket);

    setTimeout(() => {
      mockServer.stop(t);
      expect(dispatchMock).toHaveBeenCalledWith(connectSuccess());
      expect(dispatchMock).toHaveBeenCalledWith(
        changeMarket({ selectedMarket: Market.NONE })
      );
      expect(dispatchMock).toHaveBeenCalledWith(subscribeSuccess());
      expect(dispatchMock).toHaveBeenCalledWith(
        changeMarket({ selectedMarket: newMarket })
      );
    }, 100);
  });

  test('should call "unsubscribeFromMarket"', (t) => {
    mockServer.on('connection', (socket) => {
      socket.on(
        'message',
        (data: string | Blob | ArrayBuffer | ArrayBufferView) => {
          const { event } = JSON.parse(data as string);
          if (event === 'subscribe') {
            socket.send('{"event": "subscribed", "product_ids":["PI_ETHUSD"]}');
          } else if (event === 'unsubscribe') {
            socket.send('{"event": "unsubscribed"}');
          }
        }
      );
    });

    const newMarket = Market.ETH_USD;

    orderbookSocket.subscribeToMarket(newMarket);
    orderbookSocket.unsuscribeFromMarket(newMarket);

    setTimeout(() => {
      mockServer.stop(t);
      expect(dispatchMock).toHaveBeenCalledWith(connectSuccess());
      expect(dispatchMock).toHaveBeenCalledWith(
        changeMarket({ selectedMarket: Market.NONE })
      );
      expect(dispatchMock).toHaveBeenCalledWith(subscribeSuccess());
      expect(dispatchMock).toHaveBeenCalledWith(
        changeMarket({ selectedMarket: newMarket })
      );
      expect(dispatchMock).toHaveBeenCalledWith(unsubscribeSuccess());
    }, 100);
  });

  test('sould call "closeSocket" and succesfully disconnect', (t) => {
    orderbookSocket.closeSocket();

    setTimeout(() => {
      mockServer.stop(t);
      expect(dispatchMock).toHaveBeenCalledWith(disconnectSuccess());
    }, 100);
  });
});
