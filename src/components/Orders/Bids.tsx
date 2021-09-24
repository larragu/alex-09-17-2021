import React from "react";
import { useSelector } from 'react-redux';

import { OrderType, ReducersState } from "../../models";
import Order from "./Order";
import styles from './../Orders/Orders.module.css';
import { Content } from "../Content/Content";

const Bids = () => {
  const bidsMap = useSelector((state:ReducersState) => state.bids.map);
  const bidsArray = useSelector((state:ReducersState) => state.bids.list);

  let totalSize = 0;
  let totalArray:number[] = [];
  let totalCells;

  const orders = bidsArray.map((price:any) => {
    totalSize = totalSize + bidsMap[price];
    totalArray.push(totalSize);
    let size = bidsMap[price] || 0;
    return <Order key={`Bid:${price}`} size={size} price={price} orderType={OrderType.BUY} />
  });
  
  totalCells = totalArray.map(total => {
    return <div key={`BidTotal:${total}`} className={styles['total-cell']}>{total.toLocaleString()}</div>
  });

  return(
      <Content 
        totalCells={totalCells}
        orders={orders}
        totalArray={totalArray}
        orderType={OrderType.BUY}
      />
  );
}

export default React.memo(Bids)