import React from "react";
import { DESKTOP_MEDIA } from "../../../../constants";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import { OrderType } from "../../../../models";
import styles from './OrderRow.module.css';

interface OrderRowProps {
  total: number,
  size: number,
  price: number,
  orderType: OrderType
}

const OrderRow:React.FunctionComponent<OrderRowProps> = ({total, size,price, orderType}) => {
  const isDesktop = useMediaQuery(DESKTOP_MEDIA);
  const priceColor = orderType === OrderType.BUY ? styles['cell__price--bid'] : styles['cell__price--ask'];
  
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
      {orderType === OrderType.BUY && isDesktop ? columns : columns.reverse()}
    </tr>
  );
}
export default React.memo(OrderRow);