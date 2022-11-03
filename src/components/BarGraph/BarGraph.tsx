import React from 'react';

import styles from './BarGraph.module.scss';
import { OrderType } from '../../types';
import Bar from './Bar';

interface BarGraphProps {
  depthArray: number[];
  orderType: OrderType;
  isDesktop: boolean;
}

const BarGraph = ({ depthArray, orderType, isDesktop }: BarGraphProps) => {
  let graphType = '';

  if (!isDesktop && orderType === OrderType.ASK) {
    graphType = styles['ask'];
  }
  const list = depthArray.map((total: number, i: number) => {
    const percent = (total / depthArray[depthArray.length - 1]) * 100;

    return (
      <Bar
        key={i}
        isDesktop={isDesktop}
        orderType={orderType}
        percent={percent}
      />
    );
  });

  if (isDesktop) {
    if (orderType === OrderType.BID) {
      list.reverse();
    }
  }

  return <div className={`${styles['graph']} ${graphType}`}>{list}</div>;
};

export default BarGraph;
