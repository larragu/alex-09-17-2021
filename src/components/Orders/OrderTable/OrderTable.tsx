
import React from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { Ask, Bid, OrderMap, OrderType } from '../../../models';
import { BarGraph } from '../../BarGraph/BarGraph';
import OrderHeader from './OrderHeader/OrderHeader';
import OrderRow from './OrderRow/OrderRow';
import styles from './OrderTable.module.css';

interface OrderTableProps {
  feed: Bid | Ask,
  orderType: OrderType
}

const OrderTable:React.FC<OrderTableProps> = ({feed, orderType}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const getRows = (totalAsksArray:number[], list:number[], map:OrderMap, type:OrderType) => {
    return list.map((price:number, i:number) => {
        let size = map[price]!;
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
          {!(isMobile && orderType === OrderType.BUY) && <OrderHeader orderType={orderType} /> }
          <tbody>
            {feed.list.length > 0 && isMobile ? feedRows.reverse() : feedRows}
          </tbody>
      </table>
    </div>
  );
}

const areEqual = (prevProps:OrderTableProps,nextProps:OrderTableProps) => {
  return JSON.stringify(prevProps.feed.depthArray) === JSON.stringify(nextProps.feed.depthArray) &&
  JSON.stringify(prevProps.feed.map) === JSON.stringify(nextProps.feed.map);
}

export default React.memo(OrderTable, areEqual);