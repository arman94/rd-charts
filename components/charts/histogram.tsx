'use client';

import { scaleLinear, bin, max, extent } from 'd3';

import Chart from './elements/chart';
import Bars from './elements/bars';
import Axis from './elements/axis';
import Gradient from './elements/gradient';
import { useChartDimensions, useUniqueId } from './elements/utils';

const gradientColors = ['#9980FA', 'rgb(226, 222, 243)'];

type HistogramProps = {
  data: any[];
  xAccessor(arg: any): number;
  label: string;
};

export const Histogram = ({ data, xAccessor = (d) => d.x, label }: HistogramProps) => {
  const gradientId = useUniqueId('Histogram-gradient');
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 77,
  });

  const numberOfThresholds = 9;

  const xScale = scaleLinear()
    // @ts-ignore
    .domain(extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice(numberOfThresholds);

  const binsGenerator = bin()
    // @ts-ignore
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(xScale.ticks(numberOfThresholds));

  const bins = binsGenerator(data);

  const yAccessor = (d: any) => d.length;
  const yScale = scaleLinear()
    .domain([0, max(bins, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const barPadding = 2;
  const xAccessorScaled = (d: any) => xScale(d.x0) + barPadding;
  const yAccessorScaled = (d: any) => yScale(yAccessor(d));
  const widthAccessorScaled = (d: any) => xScale(d.x1) - xScale(d.x0) - barPadding;
  const heightAccessorScaled = (d: any) => dimensions.boundedHeight - yScale(yAccessor(d));
  const keyAccessor = (d: any, i: number) => i;

  return (
    <div className="h-[20.8125rem] min-w-[31rem] flex-1" ref={ref}>
      <Chart dimensions={dimensions}>
        <defs>
          <Gradient id={gradientId} colors={gradientColors} x2="0" y2="100%" />
        </defs>
        <Axis dimensions={dimensions} dimension="x" scale={xScale} label={label} />
        <Axis dimensions={dimensions} dimension="y" scale={yScale} label="Day" />
        <Bars
          data={bins}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          widthAccessor={widthAccessorScaled}
          heightAccessor={heightAccessorScaled}
          style={{ fill: `url(#${gradientId})` }}
        />
      </Chart>
    </div>
  );
};
