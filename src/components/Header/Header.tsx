import React from 'react';
import styles from './Header.module.css';
import Spread from "../Spread/Spread";

interface HeaderProps {
  isMobile: boolean
}

const Header:React.FunctionComponent<HeaderProps> = ({isMobile}) => {
  return (
  <div className={styles['header-container']}>
    <h4 className={styles['title']}>
      Order Book
    </h4>
    { !isMobile && <Spread /> }
  </div>
  )

}

export default Header;