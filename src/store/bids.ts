import { createSlice } from "@reduxjs/toolkit";
import { BidsState, BidsPayload, SortOption } from "../models";
import { transformData } from "./util";

const initialBidsState:BidsState = { list: [], map: {}, lowestBidPrice: Number.MAX_SAFE_INTEGER, highestBidPrice: Number.MIN_SAFE_INTEGER };

const bidsSlice:any = createSlice({
  name: 'bids',
  initialState: initialBidsState,
  reducers: {
    processSocketData(state:BidsState, action:BidsPayload) {
      const data = 
        transformData(
          action.payload, 
          state.map,
          state.lowestBidPrice,
          state.list,
          SortOption.DESCENDING)
        
      state.list = data.list;
      state.lowestBidPrice = data.lowestBidPrice;
      state.highestBidPrice = data.list[0];
      state.map = data.map;
    },
    clearData(state:BidsState) {
      state.list = initialBidsState.list;
      state.lowestBidPrice = initialBidsState.lowestBidPrice;
      state.highestBidPrice = initialBidsState.highestBidPrice;
      state.map = initialBidsState.map;
    }
  }
});

export const bidsActions = bidsSlice.actions;

export default bidsSlice.reducer;