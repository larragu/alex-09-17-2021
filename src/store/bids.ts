import { createSlice } from "@reduxjs/toolkit";
import { BidsState, BidsPayload, SortOption } from "../models";
import { transformData } from "./util";

const initialBidsState:BidsState = { feed:{ depthArray: [], list: [], map: {}}, lowestBidPrice: Number.MAX_SAFE_INTEGER, highestBidPrice: Number.MIN_SAFE_INTEGER };

const bidsSlice:any = createSlice({
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
          SortOption.DESCENDING)
        
      state.feed.depthArray = data.depthArray;
      state.feed.list = data.list;
      state.lowestBidPrice = data.lowestBidPrice;
      state.highestBidPrice = data.list[0];
      state.feed.map = data.map;
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