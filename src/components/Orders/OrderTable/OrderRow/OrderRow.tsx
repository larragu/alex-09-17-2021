import React from 'react';
import cn from 'classnames';

import { OrderType } from '../../../../types';
import styles from './OrderRow.module.scss';

interface OrderRowProps {
  total: number;
  size: number;
  price: number;
  orderType: OrderType;
}

const OrderRow: React.FunctionComponent<OrderRowProps> = ({
  total,
  size,
  price,
  orderType,
}) => {
  const totalCell = (
    <td key={`total:${total}`} className={styles.cell}>
      {total.toLocaleString()}
    </td>
  );

  const sizeCell = (
    <td key={`size:${size}`} className={styles.cell}>
      {size.toLocaleString()}
    </td>
  );

  const priceCell = (
    <td
      key={`price:${price}`}
      className={cn(
        styles.cell,
        orderType === OrderType.BID ? styles.priceBid : styles.priceAsk
      )}
    >
      {price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    </td>
  );

  const columns = [totalCell, sizeCell, priceCell];

  return (
    <tr
      key={price}
      className={cn(
        styles.order,
        orderType === OrderType.BID ? styles.bidColumn : styles.askColumn
      )}
    >
      {columns}
    </tr>
  );
};
export default React.memo(OrderRow);
