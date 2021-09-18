
import React from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { OrderType } from '../../models';
import styles from './Content.module.css';

interface ContentProps {
  totalCells: React.ReactNode,
  orders: React.ReactNode[],
  orderType: OrderType,
}

export const Content:React.FC<ContentProps> = ({ orders, totalCells, orderType}) => {
  let isMobile = useMediaQuery('(max-width: 600px)')
  const mobileBuyTotalCell= orderType === OrderType.BUY ? styles.BuyTotalCell : "";
  const mobileBuyColumnContainer = orderType === OrderType.BUY ? styles.BuyColumnContainer : "";

  let columnOrder = (
    <React.Fragment>
      <div className={styles.TwoColumns}>{orders}</div>
      <div className={styles.TotalColumn}>{totalCells}</div>
    </React.Fragment>
  );

  if(orderType === OrderType.BUY) {
    columnOrder = (
      <React.Fragment>
        <div className={`${styles.TotalColumnReversed} ${mobileBuyTotalCell}`}>{totalCells}</div>
        <div className={styles.TwoColumnsReversed}>{orders}</div>
      </React.Fragment>
    )
  }

  return (
  <div className={styles.Content}>
    <Header orderType={orderType} isMobile={isMobile} />
      <div className={`${styles.ColumnContainer} ${mobileBuyColumnContainer}`}>
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
  let headerCss = styles.Header;

  if(orderType === OrderType.BUY && isMobile) {
    headerNames = [];
    headerCss = "";
  } else if (orderType === OrderType.SELL){
    headerNames = ['TOTAL', 'SIZE', 'PRICE']
  }

  let content = headerNames.reverse().map(name => <div key={name} className={styles.HeaderCell}>{name}</div>);

  return (
    <div className={headerCss}>
      {content}
    </div>
  )
}
