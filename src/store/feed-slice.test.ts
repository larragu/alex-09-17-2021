
import store from './index';

import {feedActions} from './feed-slice';
import { initialFeedState, initialFilteredFeed, initialResult } from '../mocks';
import { Market } from '../types';

describe('Feed slice', () => {
   test('should have initial data when initialized', () => {
      const {bid, ask, selectedMarket} = store.getState().feed;

      expect(bid.highestBidPrice).toBe(initialFeedState.bid.highestBidPrice)
      expect(bid.lowestBidPrice).toBe(initialFeedState.bid.lowestBidPrice)
      expect(bid.map).toEqual(initialFeedState.bid.map)
      expect(bid.depthArray).toEqual(initialFeedState.bid.depthArray)
      expect(bid.list).toEqual(initialFeedState.bid.list)

      expect(ask.highestAskPrice).toBe(initialFeedState.ask.highestAskPrice)
      expect(ask.lowestAskPrice).toBe(initialFeedState.ask.lowestAskPrice)
      expect(ask.map).toEqual(initialFeedState.ask.map)
      expect(ask.depthArray).toEqual(initialFeedState.ask.depthArray)
      expect(ask.list).toEqual(initialFeedState.ask.list)

      expect(selectedMarket).toBe(initialFeedState.selectedMarket);
   });

   test('should output transformed feed', () => {
      store.dispatch(feedActions.processSocketData({bids:initialFilteredFeed.bids}));
      store.dispatch(feedActions.processSocketData({asks:initialFilteredFeed.asks}));

      const {bid, ask} = store.getState().feed;

      expect(bid.highestBidPrice).toBe(initialResult.bid.highestBidPrice)
      expect(bid.lowestBidPrice).toBe(initialResult.bid.lowestBidPrice)
      expect(bid.map).toEqual(initialResult.bid.map)
      expect(bid.depthArray).toEqual(initialResult.bid.depthArray)
      expect(bid.list).toEqual(initialResult.bid.list)

      expect(ask.highestAskPrice).toBe(initialResult.ask.highestAskPrice)
      expect(ask.lowestAskPrice).toBe(initialResult.ask.lowestAskPrice)
      expect(ask.map).toEqual(initialResult.ask.map)
      expect(ask.depthArray).toEqual(initialResult.ask.depthArray)
      expect(ask.list).toEqual(initialResult.ask.list)
   });

   test('should change market to ETHEREUM', () => {
      store.dispatch(feedActions.changeMarket({selectedMarket:Market.ETH_USD}));

      const {bid, ask, selectedMarket} = store.getState().feed;
      
      expect(bid.highestBidPrice).toBe(initialFeedState.bid.highestBidPrice)
      expect(bid.lowestBidPrice).toBe(initialFeedState.bid.lowestBidPrice)
      expect(bid.map).toEqual(initialFeedState.bid.map)
      expect(bid.depthArray).toEqual(initialFeedState.bid.depthArray)
      expect(bid.list).toEqual(initialFeedState.bid.list)

      expect(ask.highestAskPrice).toBe(initialFeedState.ask.highestAskPrice)
      expect(ask.lowestAskPrice).toBe(initialFeedState.ask.lowestAskPrice)
      expect(ask.map).toEqual(initialFeedState.ask.map)
      expect(ask.depthArray).toEqual(initialFeedState.ask.depthArray)
      expect(ask.list).toEqual(initialFeedState.ask.list)

      expect(selectedMarket).toBe(Market.ETH_USD);
   });
});