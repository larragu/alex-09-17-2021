import React from "react";
import { ReducersState, OrderType } from "../../models";
import styles from './Orders.module.css';
import { useSelector } from "react-redux";
import Spread from "../Spread/Spread";
import useMediaQuery from "../../hooks/useMediaQuery";
import { OrderTable } from "./OrderTable/OrderTable";


const Orders= () => {
  let isMobile = useMediaQuery('(max-width: 600px)')
  const {bid, ask} = useSelector((state:ReducersState) => state.feed.feed);

  return(
    <React.Fragment>
      <div className={styles['orders']}>
          <OrderTable feed={bid} orderType={OrderType.BUY} />
          {isMobile && <Spread/>}
          <OrderTable feed={ask} orderType={OrderType.SELL} />
      </div>
   </React.Fragment>
  );
}

export default React.memo(Orders)