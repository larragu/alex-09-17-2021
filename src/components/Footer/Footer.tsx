import { useEffect, useState } from 'react';

import { Market } from '../../types';
import styles from './Footer.module.scss';

interface FooterProps {
  onToggle: (selectedMarket: Market) => void;
  isDisabled: boolean;
  selectedMarket: Market;
}

const Footer = ({ onToggle, isDisabled, selectedMarket }: FooterProps) => {
  const [tempDisabled, setTempDisabled] = useState(true);
  useEffect(() => {
    if (selectedMarket !== Market.NONE) {
      setTempDisabled(false);
    }
  }, [selectedMarket]);

  const toggleHandler = (selectedMarket: Market) => {
    const newMarket =
      selectedMarket === Market.XBT_USD ? Market.ETH_USD : Market.XBT_USD;

    setTempDisabled(true);
    onToggle(newMarket);
  };

  return (
    <footer className={styles.footer}>
      <button
        disabled={isDisabled || tempDisabled}
        className={styles.buttonToggle}
        onClick={() => toggleHandler(selectedMarket)}
      >
        Toggle Feed
      </button>
    </footer>
  );
};

export default Footer;
