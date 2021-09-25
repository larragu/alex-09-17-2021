import React from 'react';
import { OrderType } from '../../../../models';

import styles from './OrderHeader.module.css';

interface OrderHeaderProp {
  orderType: OrderType
}

const OrderHeader:React.FC<OrderHeaderProp> = ({orderType}) => {
  const headerNames = ['TOTAL', 'SIZE', 'PRICE'];

  if (orderType === OrderType.SELL) {
    headerNames.reverse();
  }

  let headerElements = headerNames.map(name => <th key={name} className={styles['header-cell']}>{name}</th>);

  return (
    <thead className={styles['header']}>
      <tr 
        className={`${styles['header__row']} 
          ${orderType === OrderType.BUY ? styles['header__row--bid'] : ''} 
        `}>
        {headerElements}
      </tr>
    </thead>
  )
}

export default OrderHeader;