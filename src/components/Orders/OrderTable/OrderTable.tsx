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

const OrderTable = ({ feed, orderType }: OrderTableProps): JSX.Element => {
  const { depthArray, list, map } = feed;
  const getRows = (
    totalAsksArray: number[],
    list: number[],
    map: OrderMap,
    type: OrderType
  ) => {
    return list.map((price: number, index: number) => {
      let size = map[price]!;
      return (
        <OrderRow
          key={`${type}:${price}`}
          total={totalAsksArray[index]}
          size={size}
          price={price}
          orderType={type}
        />
      );
    });
  };
  const feedRows = getRows(depthArray, list, map, orderType);

  return (
    <section className={styles.orderTableContainer}>
      {list.length > 0 && (
        <BarGraph orderType={orderType} depthArray={depthArray} />
      )}
      <table className={styles.orderTable}>
        <OrderHeader orderType={orderType} />
        <tbody
          className={cn(
            styles.orderTableBody,
            list.length > 0 &&
              (orderType === OrderType.ASK ? styles.ask : styles.bid)
          )}
        >
          {feedRows}
        </tbody>
      </table>
    </section>
  );
};

//Profiled the rendering performance using this algorithm and made a HUGE rendering performance boost
const areEqual = (prevProps: OrderTableProps, nextProps: OrderTableProps) => {
  const { depthArray: previousDepthArray, map: previousMap } = prevProps.feed;
  const { depthArray: nextDepthArray, map: nextMap } = nextProps.feed;

  return (
    isEqual(previousDepthArray, nextDepthArray) && isEqual(previousMap, nextMap)
  );
};

export default React.memo(OrderTable, areEqual);
