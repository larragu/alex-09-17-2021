import React from "react";
import { ReducersState, OrderType } from "../../types";
import styles from './Orders.module.scss';
import { useSelector } from "react-redux";
import Spread from "../Spread/Spread";
import OrderTable from "./OrderTable/OrderTable";

interface OrdersProps {
  isDesktop: boolean
}


const Orders:React.FC<OrdersProps>  = ({isDesktop}) => {
  const {bid, ask} = useSelector((state:ReducersState) => state.feed);

  return(
    <div className={styles['orders']}>
      <OrderTable feed={bid} orderType={OrderType.BID}/>
      {!isDesktop &&  <Spread/> }
      <OrderTable feed={ask} orderType={OrderType.ASK}/>
    </div>
  );
}

export default React.memo(Orders)