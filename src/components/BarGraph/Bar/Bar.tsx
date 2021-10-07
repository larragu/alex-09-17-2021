import React from 'react';
import { OrderType } from '../../../models';

import styles from './Bar.module.scss';

interface BarProps {
  percent: number;
  orderType: OrderType,
  isDesktop: boolean
}

export const Bar:React.FC<BarProps> = React.memo(({percent, orderType, isDesktop}) => {
  let barColor = styles['bar-buy'];
  let style = {
    width: `${percent}%`,
    height: '100%'
  };

  if(orderType === OrderType.SELL) {
    barColor = styles['bar-sell'];
  }

  if(isDesktop) {
    style = {
      width: '100%',
      height: `${percent}%`
    };
  }

  return (
    <div className={barColor} key={percent} style={style} />
  )
});