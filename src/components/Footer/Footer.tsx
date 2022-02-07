import React, { useEffect } from 'react';

import { Market } from '../../types';
import styles from './Footer.module.scss';

interface FooterProps {
  toggle: (selectedMarket:Market)=>void,
  isSocketConnected: boolean,
  selectedMarket: Market
}

let isLoaded = false;
const Footer:React.FC<FooterProps>  = ({toggle, isSocketConnected, selectedMarket}) => {
  useEffect(() => {
    isLoaded = true;
  }, [])

  const toggleHandler = (selectedMarket:Market) => {
    let newMarket;
      if(selectedMarket === Market.XBT_USD) {
        newMarket = Market.ETH_USD;
      } else {
        newMarket = Market.XBT_USD;
      }
      
    toggle(newMarket);
  }

  return (
    <div className={styles['footer']}>
      <button 
        disabled={(!isLoaded || !isSocketConnected)} 
        className={styles['button-toggle']} 
        onClick={()=> toggleHandler(selectedMarket)}>
        Toggle Feed
      </button>
    </div>
  )
}

export default React.memo(Footer);