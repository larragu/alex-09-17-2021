import { createSlice } from "@reduxjs/toolkit";
import { AsksPayload, AsksState, SortOption } from "../models";
import { transformData } from "./util";
const initialAsksState:AsksState = { feed:{ depthArray: [], list: [], map: {}}, highestAskPrice: Number.MIN_SAFE_INTEGER, lowestAskPrice: Number.MAX_SAFE_INTEGER };

const asksSlice:any = createSlice({
  name: 'asks',
  initialState: initialAsksState,
  reducers: {
    processSocketData(state:AsksState, action:AsksPayload) {
      const data = 
        transformData(
          action.payload, 
          state.feed.map,
          state.highestAskPrice,
          state.feed.list,
          SortOption.ASCENDING)
          
      state.feed.depthArray = data.depthArray;
      state.feed.list = data.list;
      state.highestAskPrice = data.highestAskPrice;
      state.feed.map = data.map;
      state.lowestAskPrice = data.list[0]
    },
    clearData(state:AsksState) {
      state.feed.depthArray = initialAsksState.feed.depthArray;
      state.feed.list = initialAsksState.feed.list;
      state.lowestAskPrice = initialAsksState.lowestAskPrice;
      state.highestAskPrice = initialAsksState.highestAskPrice;
      state.feed.map = initialAsksState.feed.map;
    }
  }
});

export const asksActions = asksSlice.actions;

export default asksSlice.reducer;