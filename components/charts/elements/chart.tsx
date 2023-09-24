import { ReactNode, createContext, useContext } from 'react';
import { Dimensions } from './types';

const ChartContext = createContext(null);
export const useChartDimensions = () => useContext(ChartContext);

type ChartProps = {
  dimensions?: Dimensions;
  children: ReactNode;
};

export const Chart = ({ dimensions, children }: ChartProps) => (
  // @ts-ignore
  <ChartContext.Provider value={dimensions}>
    <svg className="Chart" width={dimensions?.width} height={dimensions?.height}>
      <g transform={`translate(${dimensions?.marginLeft}, ${dimensions?.marginTop})`}>{children}</g>
    </svg>
  </ChartContext.Provider>
);

export default Chart;
