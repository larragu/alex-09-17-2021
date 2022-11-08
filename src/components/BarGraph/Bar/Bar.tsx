import React, { CSSProperties } from 'react';
import cn from 'classnames';

import { OrderType } from '../../../types';
import styles from './Bar.module.scss';

interface BarProps {
  percent: number;
  orderType: OrderType;
}

const Bar = ({ percent, orderType }: BarProps) => {
  const style = { '--percent': `${percent}%` } as CSSProperties;

  return (
    <rect
      className={cn(
        styles.bar,
        orderType === OrderType.BID ? styles.bid : styles.ask
      )}
      key={percent}
      style={style}
    />
  );
};

export default React.memo(Bar);
