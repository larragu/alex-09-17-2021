import { createSlice } from "@reduxjs/toolkit";
import { FeedPayload, FeedState, Markets, SortOption } from "../models";
import { transformData } from "./util";

const initialFeedState:FeedState = { 
  selectedMarket: Markets.NONE,
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
            state.bid.map,
            state.bid.lowestBidPrice,
            state.bid.list,
            SortOption.DESCENDING);
        
        state.bid.depthArray = [...bidData.feed.depthArray];
        state.bid.list = [...bidData.feed.list];
        state.bid.map = {...bidData.feed.map};
        state.bid.highestBidPrice = bidData.highestBidPrice!;
        state.bid.lowestBidPrice = bidData.lowestBidPrice!;
      }
      
      if(action.payload.asks && action.payload.asks.length > 0) {
        const askData = 
          transformData(
            action.payload.asks!, 
            state.ask.map,
            state.ask.highestAskPrice,
            state.ask.list,
            SortOption.ASCENDING);

        state.ask.depthArray = [...askData.feed.depthArray];
        state.ask.list = [...askData.feed.list];
        state.ask.map = {...askData.feed.map};
        state.ask.highestAskPrice = askData.highestAskPrice!;
        state.ask.lowestAskPrice = askData.lowestAskPrice!;
      }
    },
    changeMarket(state:FeedState, action: FeedPayload) {
      state.ask.depthArray = [...initialFeedState.ask.depthArray];
      state.ask.list = [...initialFeedState.ask.list];
      state.ask.map = {...initialFeedState.ask.map};
      state.ask.lowestAskPrice = initialFeedState.ask.lowestAskPrice
      state.ask.highestAskPrice = initialFeedState.ask.highestAskPrice;

      state.bid.depthArray = [...initialFeedState.bid.depthArray];
      state.bid.list = [...initialFeedState.bid.list];
      state.bid.map = {...initialFeedState.bid.map};
      state.bid.lowestBidPrice = initialFeedState.bid.lowestBidPrice;
      state.bid.highestBidPrice = initialFeedState.bid.highestBidPrice;
      
      state.selectedMarket = action.payload.selectedMarket!;
    }
  }
});

export const feedActions = feedSlice.actions;

export default feedSlice.reducer;