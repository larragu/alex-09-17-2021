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

  const headerElements = headerNames.map(name => <th key={name} scope="col" className={styles['header-cell']}>{name}</th>);

  return (
    <thead className={styles['header']}>
      <tr 
        className={styles['header__row']}>
        {headerElements}
      </tr>
    </thead>
  )
}

export default OrderHeader;