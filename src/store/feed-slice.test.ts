import feedSlice, { changeMarket, processSocketData } from './feed-slice';
import { initialFeedState, initialFilteredFeed, initialResult } from '../mocks';
import { Market } from '../types';

describe('Feed slice', () => {
  test('should have initial data when initialized', () => {
    expect(feedSlice(undefined, { type: undefined })).toEqual(initialFeedState);
  });

  test('should output transformed feed', () => {
    expect(
      feedSlice(
        initialFeedState,
        processSocketData({ bids: initialFilteredFeed.bids })
      )
    ).toEqual({
      ...initialFeedState,
      bid: initialResult.bid,
    });

    expect(
      feedSlice(
        initialFeedState,
        processSocketData({ asks: initialFilteredFeed.asks })
      )
    ).toEqual({
      ...initialFeedState,
      ask: initialResult.ask,
    });
  });

  test('should change market to ETHEREUM', () => {
    expect(
      feedSlice(
        initialFeedState,
        changeMarket({ selectedMarket: Market.ETH_USD })
      )
    ).toEqual({
      ...initialFeedState,
      selectedMarket: Market.ETH_USD,
    });
  });
});
