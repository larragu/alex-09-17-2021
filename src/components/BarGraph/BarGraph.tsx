import React from 'react'
import styles from './BarGraph.module.css';
import { OrderType } from '../../models';
import { Bar } from './Bar/Bar';
import useMediaQuery from '../../hooks/useMediaQuery';
interface BarGraphProps {
  totalArray: number[],
  orderType: OrderType,
}

export const BarGraph:React.FC<BarGraphProps>  = ({totalArray, orderType}) => {
  let isMobile = useMediaQuery('(max-width: 600px)');
  let barColor = styles.BuyBar;

  if(orderType === OrderType.SELL) {
    barColor = styles.SellBar;
  }
  const list = totalArray.map((total:number,i:number)=> {
  const percent = ((total / totalArray[totalArray.length-1])) * 100

    return <Bar key={i} percent={percent} />
  });

  let transformBar = "";
  if(isMobile) {
    if(orderType === OrderType.BUY) {
      transformBar = styles.BarLinesContainerGreen
    } else {
      transformBar = styles.BarLinesContainerRed;
    }
  } else {
    if(orderType === OrderType.BUY) {
      list.reverse();
    }
  }
  
  return (
    <div className={styles.GraphWrapper}>
      <div className={styles.Graph}>
        <div className={`${styles.BarLinesContainer} ${barColor} ${transformBar}`}>
          {list}
        </div>
      </div>
    </div>
  );
}

