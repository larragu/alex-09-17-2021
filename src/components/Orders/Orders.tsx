import React from "react";
import { ReducersState, OrderType } from "../../models";
import styles from './Orders.module.css';
import { useSelector } from "react-redux";
import Spread from "../Spread/Spread";
import useMediaQuery from "../../hooks/useMediaQuery";
import OrderTable from "./OrderTable/OrderTable";


const Orders= () => {
  let isMobile = useMediaQuery('(max-width: 600px)')
  const {bid, ask} = useSelector((state:ReducersState) => state.feed.feed);

  return(
    <div className={styles['orders']}>
      {!isMobile &&
      <React.Fragment>
        <OrderTable feed={bid} orderType={OrderType.BUY} />
        <OrderTable feed={ask} orderType={OrderType.SELL} />
      </React.Fragment>
      }
        {isMobile && 
        <React.Fragment>
          <OrderTable feed={ask} orderType={OrderType.SELL} />
            <Spread/>
          <OrderTable feed={bid} orderType={OrderType.BUY} />
        </React.Fragment>
        }
    </div>
  );
}

export default React.memo(Orders)