import { createSlice } from "@reduxjs/toolkit";
import { FeedPayload, FeedState, SortOption } from "../models";
import { transformData } from "./util";

const initialFeedState:FeedState = { 
  feed: {
    bid: { 
      depthArray: [], 
      list: [], 
      map: {},
      lowestBidPrice: Number.MAX_SAFE_INTEGER, 
      highestBidPrice: Number.MIN_SAFE_INTEGER
    }, 
    ask: { 
      depthArray: [], 
      list: [], 
      map: {},
      highestAskPrice: Number.MIN_SAFE_INTEGER, 
      lowestAskPrice: Number.MAX_SAFE_INTEGER 
    }
  }
};

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialFeedState,
  reducers: {
    processSocketData(state:FeedState, action:FeedPayload) {
      if(action.payload.bids && action.payload.bids.length > 0) {
        const bidData = 
          transformData(
            action.payload.bids!, 
            state.feed.bid.map,
            state.feed.bid.lowestBidPrice,
            state.feed.bid.list,
            SortOption.DESCENDING);
        
        state.feed.bid.depthArray = [...bidData.feed.depthArray];
        state.feed.bid.list = [...bidData.feed.list];
        state.feed.bid.map = {...bidData.feed.map};
        state.feed.bid.highestBidPrice = bidData.highestBidPrice!;
        state.feed.bid.lowestBidPrice = bidData.lowestBidPrice!;
      }
      
      if(action.payload.asks && action.payload.asks.length > 0) {
        const askData = 
          transformData(
            action.payload.asks!, 
            state.feed.ask.map,
            state.feed.ask.highestAskPrice,
            state.feed.ask.list,
            SortOption.ASCENDING);

        state.feed.ask.depthArray = [...askData.feed.depthArray];
        state.feed.ask.list = [...askData.feed.list];
        state.feed.ask.map = {...askData.feed.map};
        state.feed.ask.highestAskPrice = askData.highestAskPrice!;
        state.feed.ask.lowestAskPrice = askData.lowestAskPrice!;
      }
    },
    clearData(state:FeedState) {
      state.feed.ask.depthArray = [...initialFeedState.feed.ask.depthArray];
      state.feed.ask.list = [...initialFeedState.feed.ask.list];
      state.feed.ask.map = {...initialFeedState.feed.ask.map};
      state.feed.ask.lowestAskPrice = initialFeedState.feed.ask.lowestAskPrice
      state.feed.ask.highestAskPrice = initialFeedState.feed.ask.highestAskPrice;

      state.feed.bid.depthArray = [...initialFeedState.feed.bid.depthArray];
      state.feed.bid.list = [...initialFeedState.feed.bid.list];
      state.feed.bid.map = {...initialFeedState.feed.bid.map};
      state.feed.bid.lowestBidPrice = initialFeedState.feed.bid.lowestBidPrice;
      state.feed.bid.highestBidPrice = initialFeedState.feed.bid.highestBidPrice;
    }
  }
});

export const feedActions = feedSlice.actions;

export default feedSlice.reducer;