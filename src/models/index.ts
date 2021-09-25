
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

export interface AsksPayload {
  payload: Order[]
}

export interface AsksState {
  feed:Feed,
  highestAskPrice: number,
  lowestAskPrice: number
}

export interface AskDataPayload {
  payload: AsksState
}

export interface BidsPayload {
  payload: Order[]
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

export interface BidsState {
  feed:Feed,
  lowestBidPrice: number,
  highestBidPrice: number
}

export interface BidDataPayload {
  payload: BidsState
}

export interface ReducersState {
  bids: BidsState,
  asks:AsksState,
  socket: any
}

export enum Markets {
  XBT_USD = 'PI_XBTUSD',
  ETH_USD = 'PI_ETHUSD'
}

export enum SocketActions {
  CONNECT = 'socket/connect',
  DISCONNECT = 'socket/disconnect',
  SUBSCRIBE = 'socket/subscribe',
  UNSUSCRIBE = 'socket/unsubscribe'
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
  isConnected: boolean, 
  isSubscribed: boolean, 
  selectedMarket: Markets
}

export interface SocketPayload {
  payload: SocketState
}

export interface SocketAction {
  type:SocketActions,
  payload: SocketState
}

export enum HighestLowest {
  HIGHEST = 'highestAskPrice',
  LOWEST =  'lowestBidPrice'
}