import React from "react";
import { useSelector } from 'react-redux';

import {  OrderType, ReducersState } from "../../models";
import Order from "./Order";
import styles from './../Orders/Orders.module.css';
import { Content } from "../Content/Content";
import { BarGraph } from "../BarGraph/BarGraph";

const Asks = () => {
  const asksMap = useSelector((state:ReducersState) => state.asks.map);
  const asksArray = useSelector((state:ReducersState) => state.asks.list);

  let totalSize = 0;
  let totalArray:number[] = [];
  let totalCells;

  const orders = asksArray.map((price:any) => {
      totalSize = totalSize + asksMap[price];
      totalArray.push(totalSize);
      let size = asksMap[price] || 0;
      return <Order key={`Ask:${price}`} size={size} price={price} orderType={OrderType.SELL}/>
    });
  
  totalCells = totalArray.map(total => {
    return <div key={`AskTotal:${total}`} className={styles['total-cell']}>{total.toLocaleString()}</div>
  })

  return(
    <React.Fragment>
      <div style={{position:'relative'}}>
        {asksArray.length > 0 &&
          <BarGraph 
              orderType={OrderType.SELL}
              totalArray={totalArray}
              />
        }
      </div>
      <Content 
      totalCells={totalCells}
      orders={orders}
      orderType={OrderType.SELL}
      />
    </React.Fragment>
  );
}

export default React.memo(Asks)