import React from 'react';

import { OrderType } from '../../../types';
import styles from './Bar.module.scss';

interface BarProps {
  percent: number;
  orderType: OrderType;
  isDesktop: boolean;
}

const Bar = ({ percent, orderType, isDesktop }: BarProps) => {
  let barColor = styles['bar-bid'];
  let style = {
    width: `${percent}%`,
    height: '100%',
  };

  if (orderType === OrderType.ASK) {
    barColor = styles['bar-ask'];
  }

  if (isDesktop) {
    style = {
      width: '100%',
      height: `${percent}%`,
    };
  }

  return <div className={barColor} key={percent} style={style} />;
};

export default React.memo(Bar);
