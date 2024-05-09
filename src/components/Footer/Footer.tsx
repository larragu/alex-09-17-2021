import { useEffect, useState } from 'react';

import { Market } from '../../types';
import styles from './Footer.module.scss';

interface FooterProps {
  onToggleFeed: (selectedMarket: Market) => void;
  isToggleFeedEnabled?: boolean;
  selectedMarket: Market;
}

const Footer = ({
  onToggleFeed,
  isToggleFeedEnabled = false,
  selectedMarket,
}: FooterProps): JSX.Element => {
  const [isToggleFeedDisabled, setIsToggleFeedDisabled] = useState(
    !isToggleFeedEnabled
  );

  useEffect(() => {
    setIsToggleFeedDisabled(!isToggleFeedEnabled);
  }, [isToggleFeedEnabled]);

  useEffect(() => {
    if (selectedMarket !== Market.NONE) {
      setIsToggleFeedDisabled(false);
    }
  }, [selectedMarket]);

  const toggleFeedHandler = (selectedMarket: Market) => {
    const newMarket =
      selectedMarket === Market.XBT_USD ? Market.ETH_USD : Market.XBT_USD;

    setIsToggleFeedDisabled(true);
    onToggleFeed(newMarket);
  };

  return (
    <footer className={styles.footer}>
      <button
        disabled={isToggleFeedDisabled}
        className={styles.buttonToggle}
        onClick={() => toggleFeedHandler(selectedMarket)}
      >
        Toggle Feed
      </button>
    </footer>
  );
};

export default Footer;
