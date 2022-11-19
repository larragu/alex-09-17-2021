import React from 'react';
import cn from 'classnames';
import isEqual from 'lodash.isequal';

import { Ask, Bid, OrderMap, OrderType } from '../../../types';
import BarGraph from '../../BarGraph';
import OrderHeader from './OrderHeader';
import OrderRow from './OrderRow';
import styles from './OrderTable.module.scss';

interface OrderTableProps {
  feed: Bid | Ask;
  orderType: OrderType;
}

const OrderTable = ({ feed, orderType }: OrderTableProps) => {
  const getRows = (
    totalAsksArray: number[],
    list: number[],
    map: OrderMap,
    type: OrderType
  ) => {
    return list.map((price: number, i: number) => {
      let size = map[price]!;
      return (
        <OrderRow
          key={`${type}:${price}`}
          total={totalAsksArray[i]}
          size={size}
          price={price}
          orderType={type}
        />
      );
    });
  };
  const feedRows = getRows(feed.depthArray, feed.list, feed.map, orderType);

  return (
    <section className={styles.orderTableContainer}>
      {feed.list.length > 0 && (
        <BarGraph orderType={orderType} depthArray={feed.depthArray} />
      )}
      <table className={styles.orderTable}>
        <OrderHeader orderType={orderType} />
        <tbody
          className={cn(
            styles.orderTableBody,
            feed.list.length > 0 &&
              (orderType === OrderType.ASK ? styles.ask : styles.bid)
          )}
        >
          {feedRows}
        </tbody>
      </table>
    </section>
  );
};

//Makes HUGE rendering performance boost
const areEqual = (prevProps: OrderTableProps, nextProps: OrderTableProps) => {
  return (
    isEqual(prevProps.feed.depthArray, nextProps.feed.depthArray) &&
    isEqual(prevProps.feed.map, nextProps.feed.map)
  );
};

export default React.memo(OrderTable, areEqual);
