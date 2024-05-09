import cn from 'classnames';

import styles from './BarGraph.module.scss';
import { OrderType } from '../../types';
import Bar from './Bar';

interface BarGraphProps {
  depthArray: number[];
  orderType: OrderType;
}

const calculateRelativeBarSize = (
  total: number,
  depthArray: number[]
): number => {
  return (total / depthArray[depthArray.length - 1]) * 100;
};

const BarGraph = ({ depthArray, orderType }: BarGraphProps): JSX.Element => {
  const list = depthArray.map((total: number, index: number) => {
    const barSizePercentage = calculateRelativeBarSize(total, depthArray);

    return <Bar key={index} orderType={orderType} size={barSizePercentage} />;
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
