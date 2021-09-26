import { createSlice } from "@reduxjs/toolkit";
import { BidsState, BidsPayload, SortOption } from "../models";
import { transformData } from "./util";

const initialBidsState:BidsState = { 
  feed:{ 
    depthArray: [], 
    list: [], 
    map: {}
  }, 
  lowestBidPrice: Number.MAX_SAFE_INTEGER, 
  highestBidPrice: Number.MIN_SAFE_INTEGER 
};

const bidsSlice = createSlice({
  name: 'bids',
  initialState: initialBidsState,
  reducers: {
    processSocketData(state:BidsState, action:BidsPayload) {
      const data = 
        transformData(
          action.payload, 
          state.feed.map,
          state.lowestBidPrice,
          state.feed.list,
          SortOption.DESCENDING);

      state.feed.depthArray = data.feed.depthArray;
      state.feed.list = data.feed.list;
      state.feed.map = data.feed.map;
      state.lowestBidPrice = data.lowestBidPrice!;
      state.highestBidPrice = data.highestBidPrice!;
    },
    clearData(state:BidsState) {
      state.feed.depthArray = initialBidsState.feed.depthArray;
      state.feed.list = initialBidsState.feed.list;
      state.lowestBidPrice = initialBidsState.lowestBidPrice;
      state.highestBidPrice = initialBidsState.highestBidPrice;
      state.feed.map = initialBidsState.feed.map;
    }
  }
});

export const bidsActions = bidsSlice.actions;

export default bidsSlice.reducer;