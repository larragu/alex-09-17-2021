import React from 'react';

import styles from './Bar.module.css';

interface BarProps {
  percent: number;
}

export const Bar:React.FC<BarProps> = React.memo(({percent}) => {
  return (
    <div className={styles['bar']} key={percent} style={{height: `${percent}%`}}/ >
  )
});