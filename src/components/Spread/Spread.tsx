import React from "react";
import { useSelector } from "react-redux";
import { ReducersState } from "../../models";

import styles from './Spread.module.css';

const Spread = () => {


  const highestBidPrice = useSelector((state:ReducersState) => state.bids.highestBidPrice);
  const lowestAskPrice = useSelector((state:ReducersState) => state.asks.lowestAskPrice);

  let spread = 0;
  let percentage = "";

  
  if(highestBidPrice !== Number.MIN_SAFE_INTEGER && lowestAskPrice !== Number.MAX_SAFE_INTEGER) {
    spread = (lowestAskPrice - highestBidPrice);
    percentage = ((spread/lowestAskPrice) * 100).toFixed(2);
  }

  return (
    <div className={styles.Spread}>
      Spread: {spread && `${spread.toFixed(1)} (${percentage}%)`}
    </div>
  );
}

export default Spread;