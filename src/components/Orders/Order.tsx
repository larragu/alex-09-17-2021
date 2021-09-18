import React from "react";
import { OrderType } from "../../models";
import styles from './Order.module.css';

interface OrderProps {
  size: number,
  price: number,
  orderType: OrderType
}

const Order:React.FunctionComponent<OrderProps> = ({size,price, orderType}) => {
  const priceColor = orderType === OrderType.BUY ? styles.BidPriceCell : styles.AskPriceCell ;
  const mobileOrderBuy = orderType === OrderType.BUY ? styles.OrderBuy : "";
  
  const sizeCell =  
    <div key={size} className={styles.Cell}>
      {size.toLocaleString()}
    </div>
    
  const priceCell =  
    <div key={price} className={`${styles.Cell} ${priceColor}`}>
      {price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    </div>

  const columns = [sizeCell, priceCell];

  return( 
    <div className={`${styles.Order} ${mobileOrderBuy}`}>
      {orderType === OrderType.BUY ? columns : columns.reverse()}
    </div>
  );
}
export default React.memo(Order);