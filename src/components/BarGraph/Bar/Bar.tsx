import React from 'react';

import styles from './Bar.module.css';

interface BarProps {
  percent: number;
}

export const Bar:React.FC<BarProps> = ({percent}) => {
  return (
    <div className={styles.Bar} key={percent} style={{height: `${percent}%`}}/ >
  )
}