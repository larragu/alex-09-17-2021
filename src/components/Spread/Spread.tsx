import React from "react";
import { useSelector } from "react-redux";
import { ReducersState } from "../../models";

import styles from './Spread.module.scss';

const Spread = () => {
  const highestBidPrice = useSelector((state:ReducersState) => state.feed.bid.highestBidPrice);
  const lowestAskPrice = useSelector((state:ReducersState) => state.feed.ask.lowestAskPrice);

  let spread = 0;
  let percentage = "";

  if(highestBidPrice !== Number.MIN_SAFE_INTEGER && lowestAskPrice !== Number.MAX_SAFE_INTEGER) {
    spread = (lowestAskPrice - highestBidPrice);
    percentage = ((spread/lowestAskPrice) * 100).toFixed(2);
  }

  return (
    <h4 className={styles['spread']}>
      Spread: {spread && `${spread.toFixed(1)} (${percentage}%)`}
    </h4>
  );
}

export default React.memo(Spread);