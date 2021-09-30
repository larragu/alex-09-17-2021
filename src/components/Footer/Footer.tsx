import React, { useEffect } from 'react';
import styles from './Footer.module.css';
interface FooterProps {
  toggle: ()=>void,
  isConnected: boolean
}
let isLoaded = false;
const Footer:React.FC<FooterProps>  = ({toggle, isConnected}) => {
  useEffect(() => {
    isLoaded = true;
  }, [])

  const toggleHandler = () => {
    toggle();
  }

  return (
    <div className={styles['footer']}>
      <button 
        disabled={(!isLoaded || !isConnected)} 
        className={styles['toggle-button']} 
        onClick={toggleHandler}>
        Toggle Feed
      </button>
    </div>
  )
}

export default React.memo(Footer);