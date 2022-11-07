import React from 'react';
import cn from 'classnames';

import { OrderType } from '../../../../types';
import styles from './OrderHeader.module.scss';

interface OrderHeaderProp {
  orderType: OrderType;
}

const OrderHeader = ({ orderType }: OrderHeaderProp) => {
  const headerNames = ['TOTAL', 'SIZE', 'PRICE'];

  if (orderType === OrderType.ASK) {
    headerNames.reverse();
  }

  const headerElements = headerNames.map((name) => (
    <th key={name} scope="col" className={styles['cell']}>
      {name}
    </th>
  ));

  return (
    <thead
      className={cn(styles['header'], {
        [styles.hideOnMobile]: orderType === OrderType.BID,
      })}
    >
      <tr className={styles['row']}>{headerElements}</tr>
    </thead>
  );
};

export default OrderHeader;
