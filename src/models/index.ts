
export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum VisibilityState {
  VISIBLE = 'visible',
  HIDDEN = 'hidden'
}

export enum SortOption {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDNG"
}

export interface FeedState {
  feed: {
    bid: Bid,
    ask: Ask
  }
}

export interface Bid {
  list: number[],
  map: OrderMap,
  depthArray: number[],
  lowestBidPrice: number, 
  highestBidPrice: number
}

export interface Ask {
  list: number[],
  map: OrderMap,
  depthArray: number[],
  highestAskPrice: number, 
  lowestAskPrice: number 
}


export interface FeedPayload {
  payload: {
    bids?: number[][],
    asks?: number[][]
  }
}

export interface Order {
  size: number,
  price: number
}

export interface Feed {
  list: number[],
  map: OrderMap,
  depthArray: number[]
}

export interface OrderMap {
  [key: number]: number
}

export interface TransformedData {
  feed:Feed,
  lowestBidPrice?: number,
  highestBidPrice?: number,
  highestAskPrice?: number, 
  lowestAskPrice?: number 
}

export interface ReducersState {
  feed:FeedState
  socket: SocketState
}

export enum Markets {
  XBT_USD = 'PI_XBTUSD',
  ETH_USD = 'PI_ETHUSD'
}


export enum SocketActions {
  CONNECT = 'socket/connect',
  DISCONNECT = 'socket/disconnect',
  SUBSCRIBE = 'socket/subscribe',
  UNSUSCRIBE = 'socket/unsubscribe',
}

export enum SocketEvent {
  subscribed = "subscribed",
  unsubscribed = "unsubscribed",
  subscribe = "subscribe",
  unsubscribe = "unsubscribe"
}

export interface SocketEventData {
    event: SocketEvent,
    product_id: Markets,
    product_ids: Markets[],
    bids: number[][],
    asks: number[][]
}

export interface SocketState {
  isConnected?: boolean, 
  isSubscribed?: boolean, 
  selectedMarket: Markets
}

export interface SocketPayload {
  payload: SocketState
}

export interface SocketAction {
  type:SocketActions,
  payload: SocketState
}

export enum BidOrAsk {
  LOWEST_ASK = 'lowestAskPrice',
  HIGHEST_ASK = 'highestAskPrice',
  LOWEST_BID =  'lowestBidPrice',
  HIGHEST_BID = 'highestBidPrice',
}