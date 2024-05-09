import React, { CSSProperties } from 'react';
import cn from 'classnames';

import { OrderType } from '../../../types';
import styles from './Bar.module.scss';

interface BarProps {
  size: number;
  orderType: OrderType;
}

const Bar = ({ size, orderType }: BarProps): JSX.Element => {
  const style = { '--percent': `${size}%` } as CSSProperties;

  return (
    <div
      className={cn(
        styles.bar,
        orderType === OrderType.BID ? styles.bid : styles.ask
      )}
      key={size}
      style={style}
    />
  );
};

export default React.memo(Bar);
