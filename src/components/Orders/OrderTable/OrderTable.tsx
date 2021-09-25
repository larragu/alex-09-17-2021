
import React from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { Feed, OrderMap, OrderType } from '../../../models';
import { BarGraph } from '../../BarGraph/BarGraph';
import OrderRow from './OrderRow/OrderRow';
import styles from './OrderTable.module.css';

interface OrderTableProps {
  feed: Feed,
  orderType: OrderType
}

export const OrderTable:React.FC<OrderTableProps> = ({feed, orderType}) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  const getRows = (totalAsksArray:number[], list:number[], map:OrderMap, type:OrderType) => {
    return list.map((price:number, i:number) => {
        let size = map[price] || 0;
        return <OrderRow key={`${type}:${price}`} total={totalAsksArray[i]} size={size} price={price} orderType={type}/>
      });
  }

  const feedRows = getRows(feed.depthArray, feed.list, feed.map, orderType)

  return (
      <div className={styles['order-table']}>
        <BarGraph 
          orderType={orderType}
          depthArray={feed.depthArray}
        />
        <table className={styles['table']}>
          {!(isMobile && orderType === OrderType.SELL) && <Header orderType={orderType} /> }
          <tbody className={`${styles['table__body']}`}>
            {feedRows}
          </tbody>
      </table>
    </div>
  );
}

interface HeaderProp {
  orderType: OrderType
}

const Header:React.FC<HeaderProp> = ({orderType}) => {
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
