import React from 'react'
import styles from './BarGraph.module.css';
import { OrderType } from '../../models';
import { Bar } from './Bar/Bar';
import useMediaQuery from '../../hooks/useMediaQuery';

interface BarGraphProps {
  depthArray: number[],
  orderType: OrderType,
}

export const BarGraph:React.FC<BarGraphProps>  = ({depthArray, orderType}) => {
  let isDesktop = useMediaQuery('(min-width: 40rem)');
  let barColor = styles['buy-bar'];
  let barGraph = '';

  if(orderType === OrderType.SELL) {
    barColor = styles['sell-bar'];
    barGraph = styles['graph__sell'];
  }
  const list = depthArray.map((total:number,i:number)=> {
  const percent = ((total / depthArray[depthArray.length-1])) * 100
    return <Bar key={i} percent={percent} />
  });

  let transformBar = "";
  if(!isDesktop) {
    if(orderType === OrderType.SELL) {
      transformBar = styles['bar-lines-container--red'];
    }
  } else {
    if(orderType === OrderType.BUY) {
      list.reverse();
    }
  }
  
  return (
    <div className={`${styles['graph']} ${barGraph}`}>
        <div className={`${styles['bar-lines-container']} ${barColor} ${transformBar}`}>
          {list}
        </div>
    </div>
  );
}
