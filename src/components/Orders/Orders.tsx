import React from "react";
import Asks from "./Asks";
import Bids from "./Bids";
import { Markets, ReducersState } from "../../models";
import styles from './Orders.module.css';
import store from "../../store";
import { socketActions } from "../../store/socket";
import { useSelector } from "react-redux";
import Spread from "../Spread/Spread";
import useMediaQuery from "../../hooks/useMediaQuery";

interface OrdersProps {
  selectedMarket: Markets
}

const Orders:React.FC<OrdersProps> = ({selectedMarket}) => {
  let isMobile = useMediaQuery('(max-width: 600px)')
  const isConnected = useSelector((state:ReducersState) => state.socket.isConnected);
  
  let newMarket:Markets;
  if(selectedMarket === Markets.XBT_USD) {
    newMarket = Markets.ETH_USD
  } else {
    newMarket = Markets.XBT_USD
  }

  const toggleHandler = () => {
    store.dispatch(socketActions.subscribe({selectedMarket:newMarket}));
  }

  return(
    <React.Fragment>
      <div className={styles.Orders}>
        <Bids />
        {isMobile && <Spread/>}
        <Asks />
      </div>
      <div className={styles.Footer}>
        <button disabled={!isConnected} className={styles.ToggleButton} onClick={toggleHandler}>
          Toggle Feed
        </button>
      </div>
   </React.Fragment>
  );
}

export default React.memo(Orders)