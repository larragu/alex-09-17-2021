import {
  connectError,
  connectSuccess,
  connectToSocket,
  disconnectFromSocket,
  disconnectSuccess,
  subscribeSuccess,
  subscribeToMarket,
  unsubscribeFromMarket,
  unsubscribeSuccess,
} from './store/socket-slice';

export enum OrderType {
  BID = 'BID', //Buy Side (green)
  ASK = 'ASK', //Sell Side (red)
}

export enum VisibilityState {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

export enum SortOption {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDNG',
}

export interface FeedState {
  selectedMarket: Market;
  bid: Bid;
  ask: Ask;
}

export interface Bid {
  list: number[];
  map: OrderMap;
  depthArray: number[];
  lowestBidPrice: number;
  highestBidPrice: number;
}

export interface Ask {
  list: number[];
  map: OrderMap;
  depthArray: number[];
  highestAskPrice: number;
  lowestAskPrice: number;
}

export interface FeedPayload {
  payload: {
    bids?: number[][];
    asks?: number[][];
    selectedMarket?: Market;
  };
}

export interface Order {
  size: number;
  price: number;
}

export interface Feed {
  list: number[];
  map: OrderMap;
  depthArray: number[];
}

export interface OrderMap {
  [key: number]: number;
}

export interface TransformedData {
  feed: Feed;
  lowestBidPrice?: number;
  highestBidPrice?: number;
  highestAskPrice?: number;
  lowestAskPrice?: number;
}

export interface ReducersState {
  feed: FeedState;
  socket: SocketState;
}

export enum Market {
  XBT_USD = 'PI_XBTUSD',
  ETH_USD = 'PI_ETHUSD',
  NONE = 'NONE',
}

export enum SocketEvent {
  subscribed = 'subscribed',
  unsubscribed = 'unsubscribed',
  subscribe = 'subscribe',
  unsubscribe = 'unsubscribe',
}

export interface SocketEventData {
  event?: SocketEvent;
  product_id?: Market;
  product_ids?: Market[];
  bids: [number, number][];
  asks: [number, number][];
}

export interface SocketState {
  isConnected?: boolean;
  isSubscribed?: boolean;
  isConnecting: boolean;
  isSubscribing: boolean;
  connectionError: boolean;
}

export enum BidOrAsk {
  LOWEST_ASK = 'lowestAskPrice',
  HIGHEST_ASK = 'highestAskPrice',
  LOWEST_BID = 'lowestBidPrice',
  HIGHEST_BID = 'highestBidPrice',
}

export enum ModalStatus {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}

type ConnectErrorAction = typeof connectError;
type ConnectSuccessAction = typeof connectSuccess;
type ConnectToSocketAction = typeof connectToSocket;
type DisconnectToSocketAction = typeof disconnectFromSocket;
type DisconnectSuccessAction = typeof disconnectSuccess;
type SubscribeSuccessAction = typeof subscribeSuccess;
type SubscribeToMarketAction = typeof subscribeToMarket;
type UnsubscribeFromMarketAction = typeof unsubscribeFromMarket;
type UnsubscribeSuccess = typeof unsubscribeSuccess;

export type SocketAction =
  | ConnectErrorAction
  | ConnectSuccessAction
  | ConnectToSocketAction
  | DisconnectToSocketAction
  | DisconnectSuccessAction
  | SubscribeSuccessAction
  | SubscribeToMarketAction
  | UnsubscribeFromMarketAction
  | UnsubscribeSuccess;
