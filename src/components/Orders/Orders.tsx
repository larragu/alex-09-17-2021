import React from 'react';

import { ReducersState, OrderType } from '../../types';
import styles from './Orders.module.scss';
import Spread from '../Spread';
import OrderTable from './OrderTable';
import { useAppSelector } from '../../hooks';

const Orders = () => {
  const { bid, ask } = useAppSelector((state: ReducersState) => state.feed);

  return (
    <main className={styles.orders}>
      <OrderTable feed={bid} orderType={OrderType.BID} />
      <div className={styles.spread}>
        <Spread />
      </div>
      <OrderTable feed={ask} orderType={OrderType.ASK} />
    </main>
  );
};

export default React.memo(Orders);
