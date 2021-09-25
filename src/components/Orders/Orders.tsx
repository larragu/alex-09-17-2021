import React from "react";
import { OrderType, ReducersState } from "../../models";
import styles from './Orders.module.css';
import { useSelector } from "react-redux";
import Spread from "../Spread/Spread";
import useMediaQuery from "../../hooks/useMediaQuery";
import { OrderTable } from "./OrderTable/OrderTable";


const Orders= () => {
  let isMobile = useMediaQuery('(max-width: 600px)')
  const bidsFeed = useSelector((state:ReducersState) => state.bids.feed);
  const asksFeed = useSelector((state:ReducersState) => state.asks.feed);

  return(
    <React.Fragment>
      <div className={styles['orders']}>
          <OrderTable feed={bidsFeed} orderType={OrderType.BUY} />
          {isMobile && <Spread/>}
          <OrderTable feed={asksFeed} orderType={OrderType.SELL} />
      </div>
   </React.Fragment>
  );
}

export default React.memo(Orders)