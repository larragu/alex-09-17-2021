import React from 'react';

import styles from './Header.module.scss';
import Spread from "../Spread/Spread";

interface HeaderProps {
  isDesktop: boolean
}

const Header:React.FunctionComponent<HeaderProps> = ({isDesktop}) => {
  return (
  <div className={styles['header']}>
    <h4 className={styles['title']}>
      Order Book
    </h4>
    { isDesktop && <Spread /> }
  </div>
  )

}

export default React.memo(Header);