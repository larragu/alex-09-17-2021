import React from "react";
import { OrderType } from "../../../../models";
import styles from './OrderRow.module.scss';

interface OrderRowProps {
  total: number,
  size: number,
  price: number,
  orderType: OrderType,
  isDesktop: boolean
}

const OrderRow:React.FunctionComponent<OrderRowProps> = ({total, size,price, orderType, isDesktop}) => {
  const priceColor = orderType === OrderType.BID ? styles['price--bid'] : styles['price--ask'];
  
  const totalCell =  
    <td key={`total:${total}`} className={styles['cell']}>
      {total.toLocaleString()}
    </td>

  const sizeCell =  
    <td key={`size:${size}`} className={styles['cell']}>
      {size.toLocaleString()}
    </td>
    
  const priceCell =  
    <td key={`price:${price}`} className={`${styles['cell']} ${priceColor}`}>
      {price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    </td>

  const columns = [totalCell, sizeCell, priceCell];

  return( 
    <tr key={price} className={styles['order']}>
      {orderType === OrderType.BID && isDesktop ? columns : columns.reverse()}
    </tr>
  );
}
export default React.memo(OrderRow);