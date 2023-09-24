'use client';

import * as d3 from 'd3';

import Chart from './elements/chart';
import Circles from './elements/circle';
import Axis from './elements/axis';
import { useChartDimensions } from './elements/utils';

type ScatterPlotProps = {
  data: any[];
  xAccessor(arg: any): number;
  yAccessor(arg: any): number;
  xLabel: string;
  yLabel: string;
};

export function ScatterPlot({
  data,
  xAccessor = (d) => d.x,
  yAccessor = (d) => d.y,
  xLabel,
  yLabel,
}: ScatterPlotProps) {
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 77,
  });

  // @ts-ignore
  const xScale = d3.scaleLinear().domain(d3.extent(data, xAccessor)).range([0, dimensions.boundedWidth]).nice();
  // @ts-ignore
  const yScale = d3.scaleLinear().domain(d3.extent(data, yAccessor)).range([dimensions.boundedHeight, 0]).nice();

  const xAccessorScaled = (d: any) => xScale(xAccessor(d));
  const yAccessorScaled = (d: any) => yScale(yAccessor(d));
  const keyAccessor = (d: any, i: any) => i;

  return (
    <div className="ScatterPlot" ref={ref}>
      <Chart dimensions={dimensions}>
        <Axis dimensions={dimensions} dimension="x" scale={xScale} label={xLabel} />
        <Axis dimensions={dimensions} dimension="y" scale={yScale} label={yLabel} />
        <Circles data={data} keyAccessor={keyAccessor} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} />
      </Chart>
    </div>
  );
}
