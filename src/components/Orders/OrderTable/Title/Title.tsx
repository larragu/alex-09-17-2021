import React from 'react';
import styles from './Title.module.css';
import Spread from "../../../Spread/Spread";

interface TitleProps {
  isMobile: boolean
}

const Title:React.FunctionComponent<TitleProps> = ({isMobile}) => {
  return (
  <div className={styles['headers']}>
    <h4 className={styles['title']}>
      Order Book
    </h4>
    { !isMobile && <Spread /> }
  </div>
  )

}

export default Title;