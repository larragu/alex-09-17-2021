import React from "react";
import { ReducersState, OrderType } from "../../models";
import styles from './Orders.module.css';
import { useSelector } from "react-redux";
import Spread from "../Spread/Spread";
import useMediaQuery from "../../hooks/useMediaQuery";
import OrderTable from "./OrderTable/OrderTable";


const Orders= () => {
  let isDesktop = useMediaQuery('(min-width: 40rem)')
  const {bid, ask} = useSelector((state:ReducersState) => state.feed.feed);

  return(
    <div className={styles['orders']}>
      <OrderTable feed={bid} orderType={OrderType.BUY} />
      {!isDesktop &&  <Spread/> }
      <OrderTable feed={ask} orderType={OrderType.SELL} />
    </div>
  );
}

export default React.memo(Orders)