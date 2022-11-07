import React from 'react';

import styles from './Header.module.scss';
import Spread from '../Spread';

const Header = () => {
  return (
    <div className={styles['header']}>
      <h3 className={styles['title']}>Order Book</h3>
      <div className={styles.spread}>
        <Spread />
      </div>
    </div>
  );
};

export default Header;
