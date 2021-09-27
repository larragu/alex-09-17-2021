import React from 'react';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { OrderType } from '../../../../models';

import styles from './OrderHeader.module.css';

interface OrderHeaderProp {
  orderType: OrderType
}

const OrderHeader:React.FC<OrderHeaderProp> = ({orderType}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const headerNames = ['TOTAL', 'SIZE', 'PRICE'];

  if (orderType === OrderType.SELL || (OrderType.BUY && isMobile)) {
    headerNames.reverse();
  }

  let headerElements = headerNames.map(name => <th key={name} scope="col" className={styles['header-cell']}>{name}</th>);

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