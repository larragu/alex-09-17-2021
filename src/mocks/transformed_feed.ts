import { FeedState, Markets } from "../types";

export const bid = {
  depthArray: [
    400000, 700000, 1185213,
    1485213, 1710213, 1850327,
    1869943, 2069942, 2089942,
    2207546, 2209632, 2210082,
    2233300, 2311976, 2321976,
    2331976
  ],
  list: [
    44462, 43897.5, 43896.5,
    43681, 43594, 43507,
    43446, 43437.5, 43431,
    43430.5, 43427, 43406.5,
    43403.5, 43403, 43383,
    43379
  ],
  map: {
    '43379': 10000,
    '43383': 10000,
    '43403': 78676,
    '43427': 2086,
    '43431': 20000,
    '43446': 19616,
    '43507': 140114,
    '43594': 225000,
    '43681': 300000,
    '44462': 400000,
    '43403.5': 23218,
    '43406.5': 450,
    '43430.5': 117604,
    '43437.5': 199999,
    '43896.5': 485213,
    '43897.5': 300000
  },
  lowestBidPrice: 43383,
  highestBidPrice: 44462
}

export const ask = {
  depthArray: [
    8664, 16915, 77525,
    80672, 95672, 160688,
    165688, 166608, 181279,
    191279, 196482, 211354,
    221354, 223854, 230465,
    232537
  ],
  list: [
    43319, 43322, 43327,
    43328, 43333.5, 43335,
    43338.5, 43339, 43339.5,
    43343.5, 43345.5, 43346,
    43347.5, 43348, 43354,
    43366
  ],
  map: {
    '43319': 8664,
    '43322': 8251,
    '43327': 60610,
    '43328': 3147,
    '43335': 65016,
    '43339': 920,
    '43346': 14872,
    '43348': 2500,
    '43354': 6611,
    '43366': 2072,
    '43347.5': 10000,
    '43345.5': 5203,
    '43343.5': 10000,
    '43339.5': 14671,
    '43338.5': 5000,
    '43333.5': 15000
  },
  highestAskPrice: 43354,
  lowestAskPrice: 43319
}

export const initialResult: FeedState = {
  ask: ask,
  bid: bid,
  selectedMarket: Markets.XBT_USD
}

export const initialFeedState:FeedState = { 
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