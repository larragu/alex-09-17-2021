import { FeedState, Market } from '../types';

export const bid = {
  depthArray: [
    2072, 8683, 11183, 21183, 36055, 41258, 51258, 65929, 66849, 71849, 136865,
    151865, 155012, 215622, 223873, 232537,
  ],
  list: [
    43366, 43354, 43348, 43347.5, 43346, 43345.5, 43343.5, 43339.5, 43339,
    43338.5, 43335, 43333.5, 43328, 43327, 43322, 43319,
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
    '43333.5': 15000,
  },
  lowestBidPrice: 43319,
  highestBidPrice: 43366,
};

export const ask = {
  depthArray: [
    10000, 20000, 98676, 121894, 122344, 124430, 242034, 262034, 462033, 481649,
    621763, 846763, 1146763, 1631976, 1931976, 2331976,
  ],
  list: [
    43379, 43383, 43403, 43403.5, 43406.5, 43427, 43430.5, 43431, 43437.5,
    43446, 43507, 43594, 43681, 43896.5, 43897.5, 44462,
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
    '43897.5': 300000,
  },
  highestAskPrice: 44462,
  lowestAskPrice: 43379,
};

export const initialResult: FeedState = {
  ask: ask,
  bid: bid,
  selectedMarket: Market.XBT_USD,
};

export const initialFeedState: FeedState = {
  selectedMarket: Market.NONE,
  bid: {
    depthArray: [],
    list: [],
    map: {},
    lowestBidPrice: Number.MAX_SAFE_INTEGER,
    highestBidPrice: Number.MIN_SAFE_INTEGER,
  },
  ask: {
    depthArray: [],
    list: [],
    map: {},
    highestAskPrice: Number.MIN_SAFE_INTEGER,
    lowestAskPrice: Number.MAX_SAFE_INTEGER,
  },
};
