import React, { useEffect } from 'react';
import { Markets } from '../../models';
import store from '../../store';
import { socketActions } from '../../store/socket';
import styles from './Footer.module.css';
interface FooterProps {
  selectedMarket: Markets,
  isConnected: boolean;
}
let isLoaded = false;
const Footer:React.FC<FooterProps>  = ({selectedMarket, isConnected}) => {
  let newMarket:Markets;
  if(selectedMarket === Markets.XBT_USD) {
    newMarket = Markets.ETH_USD
  } else {
    newMarket = Markets.XBT_USD
  }
  useEffect(() => {
    isLoaded = true;
  }, [])

  const toggleHandler = () => {
    store.dispatch(socketActions.subscribe({selectedMarket:newMarket}));
  }

  return (
    <div className={styles['footer']}>
      <button disabled={(!isLoaded || !isConnected)} className={styles['toggle-button']} onClick={toggleHandler}>
        Toggle Feed
      </button>
    </div>
  )
}

export default Footer;