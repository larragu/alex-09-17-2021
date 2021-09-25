import React from "react";
import { Markets, OrderType, ReducersState } from "../../models";
import styles from './Orders.module.css';
import store from "../../store";
import { socketActions } from "../../store/socket";
import { useSelector } from "react-redux";
import Spread from "../Spread/Spread";
import useMediaQuery from "../../hooks/useMediaQuery";
import { OrderTable } from "./OrderTable/OrderTable";

interface OrdersProps {
  selectedMarket: Markets
}

const Orders:React.FC<OrdersProps> = ({selectedMarket}) => {
  let isMobile = useMediaQuery('(max-width: 600px)')
  const isConnected = useSelector((state:ReducersState) => state.socket.isConnected);
  const bidsFeed = useSelector((state:ReducersState) => state.bids.feed);
  const asksFeed = useSelector((state:ReducersState) => state.asks.feed);
  
  let newMarket:Markets;
  if(selectedMarket === Markets.XBT_USD) {
    newMarket = Markets.ETH_USD
  } else {
    newMarket = Markets.XBT_USD
  }

  const toggleHandler = () => {
    store.dispatch(socketActions.subscribe({selectedMarket:newMarket}));
  }

  return(
    <React.Fragment>
      <div className={styles['orders']}>
          {bidsFeed.depthArray.length > 0 &&
            <OrderTable feed={bidsFeed} orderType={OrderType.BUY} />
          }
          {isMobile && <Spread/>}
          {asksFeed.depthArray.length > 0 &&
            <OrderTable feed={asksFeed} orderType={OrderType.SELL} />
          }
      </div>
      <div className={styles['footer']}>
        <button disabled={!isConnected} className={styles['toggle-button']} onClick={toggleHandler}>
          Toggle Feed
        </button>
      </div>
   </React.Fragment>
  );
}

export default React.memo(Orders)