
import React from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { Feed, OrderMap, OrderType } from '../../../models';
import { BarGraph } from '../../BarGraph/BarGraph';
import OrderHeader from './OrderHeader/OrderHeader';
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
        {feed.list.length > 0 && <BarGraph 
          orderType={orderType}
          depthArray={feed.depthArray}/>
        }
        <table className={styles['table']}>
          {!(isMobile && orderType === OrderType.SELL) && <OrderHeader orderType={orderType} /> }
          <tbody className={`${styles['table__body']}`}>
            {feed.list.length > 0 && feedRows}
          </tbody>
      </table>
    </div>
  );
}
