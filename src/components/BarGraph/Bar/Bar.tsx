import React, { CSSProperties } from 'react';
import cn from 'classnames';

import { OrderType } from '../../../types';
import styles from './Bar.module.scss';

interface BarProps {
  percent: number;
  orderType: OrderType;
}

const Bar = ({ percent, orderType }: BarProps) => {
  let barColor = styles['bar-bid'];

  if (orderType === OrderType.ASK) {
    barColor = styles['bar-ask'];
  }

  const style = { '--percent': `${percent}%` } as CSSProperties;

  return (
    <rect className={cn(styles.bar, barColor)} key={percent} style={style} />
  );
};

export default React.memo(Bar);
