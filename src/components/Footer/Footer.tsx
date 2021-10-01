import React, { useEffect } from 'react';
import { Markets } from '../../models';
import styles from './Footer.module.css';
interface FooterProps {
  toggle: (selectedMarket:Markets)=>void,
  isConnected: boolean,
  selectedMarket: Markets
}
let isLoaded = false;
const Footer:React.FC<FooterProps>  = ({toggle, isConnected, selectedMarket}) => {
  useEffect(() => {
    isLoaded = true;
  }, [])

  const toggleHandler = (selectedMarket:Markets) => {
    let newMarket;
      if(selectedMarket === Markets.XBT_USD) {
        newMarket = Markets.ETH_USD;
      } else {
        newMarket = Markets.XBT_USD;
      }

    toggle(newMarket);
  }

  return (
    <div className={styles['footer']}>
      <button 
        disabled={(!isLoaded || !isConnected)} 
        className={styles['toggle-button']} 
        onClick={()=> toggleHandler(selectedMarket)}>
        Toggle Feed
      </button>
    </div>
  )
}

export default React.memo(Footer);