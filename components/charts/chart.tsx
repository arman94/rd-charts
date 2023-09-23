import { createContext, useContext } from 'react';

const ChartContext = createContext(null);
export const useChartDimensions = () => useContext(ChartContext);

// @ts-ignore
export const Chart = ({ dimensions = {}, children }) => (
  // @ts-ignore
  <ChartContext.Provider value={dimensions}>
    {/* @ts-ignore */}
    <svg className="Chart" width={dimensions?.width} height={dimensions?.height}>
      {/* @ts-ignore */}
      <g transform={`translate(${dimensions?.marginLeft}, ${dimensions?.marginTop})`}>{children}</g>
    </svg>
  </ChartContext.Provider>
);

export default Chart;
