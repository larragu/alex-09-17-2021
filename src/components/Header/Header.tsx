import React from 'react';

import styles from './Header.module.scss';
import Spread from '../Spread';

interface HeaderProps {
  isDesktop: boolean;
}

const Header = ({ isDesktop }: HeaderProps) => {
  return (
    <div className={styles['header']}>
      <h3 className={styles['title']}>Order Book</h3>
      {isDesktop && <Spread />}
    </div>
  );
};

export default Header;
