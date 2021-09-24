
import React from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { OrderType } from '../../models';
import { BarGraph } from '../BarGraph/BarGraph';
import styles from './Content.module.css';

interface ContentProps {
  totalCells: React.ReactNode,
  orders: React.ReactNode[],
  orderType: OrderType,
  totalArray: number[]
}

export const Content:React.FC<ContentProps> = ({totalArray, orders, totalCells, orderType}) => {
  let isMobile = useMediaQuery('(max-width: 600px)')
  const mobileBuyTotalCell= orderType === OrderType.BUY ? styles['buy-total-cell'] : "";
  const mobileBuyColumnContainer = orderType === OrderType.BUY ? styles['buy-column-container'] : "";

  let columnOrder = (
    <React.Fragment>
      {totalArray.length > 0 &&
        <BarGraph 
            orderType={orderType}
            totalArray={totalArray}
            />
      }
      <div className={styles['two-columns']}>{orders}</div>
      <div className={styles['total-column']}>{totalCells}</div>
    </React.Fragment>
  );

  if(orderType === OrderType.BUY) {
    columnOrder = (
      <React.Fragment>
        {totalArray.length > 0 &&
          <BarGraph 
              orderType={orderType}
              totalArray={totalArray}
              />
        }
        <div className={`${styles['total-column-reversed']} ${mobileBuyTotalCell}`}>{totalCells}</div>
        <div className={styles['two-columns-reversed']}>{orders}</div>
      </React.Fragment>
    )
  }

  return (
  <div className={styles['content']}>
    <Header orderType={orderType} isMobile={isMobile} />
      <div className={`${styles['column-container']} ${mobileBuyColumnContainer}`}>
        {columnOrder}
      </div>
  </div>
  );
}

interface HeaderProp {
  orderType: OrderType,
  isMobile: boolean
}
const Header:React.FC<HeaderProp> = ({orderType, isMobile}) => {

  let headerNames = ['PRICE', 'SIZE', 'TOTAL'];
  let headerCss = styles['header'];

  if(orderType === OrderType.BUY && isMobile) {
    headerNames = [];
    headerCss = "";
  } else if (orderType === OrderType.SELL){
    headerNames = ['TOTAL', 'SIZE', 'PRICE']
  }

  let content = headerNames.reverse().map(name => <div key={name} className={styles['header-cell']}>{name}</div>);

  return (
    <div className={headerCss}>
      {content}
    </div>
  )
}
