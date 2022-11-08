import cn from 'classnames';

import styles from './BarGraph.module.scss';
import { OrderType } from '../../types';
import Bar from './Bar';

interface BarGraphProps {
  depthArray: number[];
  orderType: OrderType;
}

const BarGraph = ({ depthArray, orderType }: BarGraphProps) => {
  const list = depthArray.map((total: number, i: number) => {
    const percent = (total / depthArray[depthArray.length - 1]) * 100;

    return <Bar key={i} orderType={orderType} percent={percent} />;
  });

  return (
    <div
      className={cn(
        styles.graph,
        orderType === OrderType.ASK ? styles.ask : styles.bid
      )}
    >
      {list}
    </div>
  );
};

export default BarGraph;
