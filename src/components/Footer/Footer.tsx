import { useEffect } from 'react';

import { Market } from '../../types';
import styles from './Footer.module.scss';

interface FooterProps {
  onToggle: (selectedMarket: Market) => void;
  isSocketConnected: boolean;
  selectedMarket: Market;
}

let isLoaded = false;
const Footer = ({
  onToggle,
  isSocketConnected,
  selectedMarket,
}: FooterProps) => {
  useEffect(() => {
    isLoaded = true;
  }, []);

  const toggleHandler = (selectedMarket: Market) => {
    let newMarket;
    if (selectedMarket === Market.XBT_USD) {
      newMarket = Market.ETH_USD;
    } else {
      newMarket = Market.XBT_USD;
    }

    onToggle(newMarket);
  };

  return (
    <footer className={styles.footer}>
      <button
        disabled={!isLoaded || !isSocketConnected}
        className={styles.buttonToggle}
        onClick={() => toggleHandler(selectedMarket)}
      >
        Toggle Feed
      </button>
    </footer>
  );
};

export default Footer;
