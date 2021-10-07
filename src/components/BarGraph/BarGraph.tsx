import React from 'react'
import styles from './BarGraph.module.css';
import { OrderType } from '../../models';
import { Bar } from './Bar/Bar';

interface BarGraphProps {
  depthArray: number[],
  orderType: OrderType,
  isDesktop: boolean
}

export const BarGraph:React.FC<BarGraphProps>  = ({depthArray, orderType, isDesktop}) => {
  let graphType = '';

  if(orderType === OrderType.SELL) {
    graphType = styles['graph__sell'];
  }
  const list = depthArray.map((total:number,i:number)=> {
    const percent = ((total / depthArray[depthArray.length-1])) * 100;
    return <Bar key={i} isDesktop={isDesktop} orderType={orderType} percent={percent} />
  });

  if(isDesktop) {
    if(orderType === OrderType.BUY) {
      list.reverse();
    }
  }
  
  return (
    <div className={`${styles['graph']} ${graphType}`}>
      {list}
    </div>
  );
}
